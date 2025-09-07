import { useState, useEffect } from "react";
import "./video.css";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Video() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const handleEditComment = async (commentId) => {
    try {
      const res = await axios.put(
        `https://youtube-backend-9m2f.onrender.com/commentApi/comment/${commentId}`,
        { message: editMessage },
        { withCredentials: true }
      );
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, message: res.data.comment.message } : c
        )
      );
      setEditingCommentId(null);
      setEditMessage("");
      toast.success("Comment updated");
    } catch (err) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await axios.delete(
        `https://youtube-backend-9m2f.onrender.com/commentApi/comment/${commentId}`,
        { withCredentials: true }
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  const fetchVideoById = async () => {
    try {
      const response = await axios.get(
        `https://youtube-backend-9m2f.onrender.com/api/getVideoById/${id}`
      );
      setData(response.data.video);
      setVideoUrl(response?.data?.video?.videoLink);
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(
        `https://youtube-backend-9m2f.onrender.com/commentApi/comment/${id}`
      );
      setComments(response.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    try {
      const res = await axios.post(
        "https://youtube-backend-9m2f.onrender.com/commentApi/comment",
        body,
        { withCredentials: true }
      );
      const newComment = res.data.comment;
      setComments([newComment, ...comments]);
      setMessage("");
    } catch (err) {
      toast.error("Please Login First to Comment");
    }
  };

  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  }, [id]);

  useEffect(() => {
    axios
      .get("https://youtube-backend-9m2f.onrender.com/api/allVideo")
      .then((res) => {
        setSuggestions(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLike = async () => {
    if (!userId) {
      toast.error("Please login to like the video");
      return;
    }
    try {
      const res = await axios.post(
        `https://youtube-backend-9m2f.onrender.com/api/${id}/like`,
        {},
        { withCredentials: true }
      );
      setData((prev) => ({
        ...prev,
        like: res.data.likeCount,
        dislike: res.data.dislikeCount,
      }));
    } catch (err) {
      toast.error("Error liking video");
    }
  };

  const handleDislike = async () => {
    if (!userId) {
      toast.error("Please login to dislike the video");
      return;
    }
    try {
      const res = await axios.post(
        `https://youtube-backend-9m2f.onrender.com/api/${id}/dislike`,
        {},
        { withCredentials: true }
      );
      setData((prev) => ({
        ...prev,
        like: res.data.likeCount,
        dislike: res.data.dislikeCount,
      }));
    } catch (err) {
      toast.error("Error disliking video");
    }
  };

  return (
    <div className="video">
      {/* Left side - video content */}
      <div className="videoPostSection">
        <div className="video_youtube">
          {data && (
            <video
              key={videoUrl}
              width="400"
              controls
              autoPlay
              className="video_youtube_video"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="video_youtubeAbout">
          <div className="video_uTubeTitle">{data?.title}</div>
          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_ProfileBlock_left_img"
              >
                <img
                  className="youtube_video_ProfileBlock_left_image"
                  src={data?.user?.profilePic}
                  alt="Profile"
                />
              </Link>
              <div className="youtubeVideo_subView">
                <div className="youtubePostProfileName">
                  {data?.user?.channelName}
                </div>
                <div className="youtubePostProfileSubs">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </div>
              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>
            <div className="youtube_video_likeBlock">
              <div
                className="youtube_video_likeBlock_Like"
                onClick={handleLike}
              >
                <AiOutlineLike />
                <div className="youtube_video_likeBlock_NoOfLikes">
                  {data?.like}
                </div>
                <div className="youtubeVideoDivider"></div>
              </div>
              <div
                className="youtube_video_likeBlock_Like"
                onClick={handleDislike}
              >
                <AiOutlineDislike />
              </div>
            </div>
          </div>

          <div className="youtube_video_About">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>

          <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">
              {comments.length} Comments
            </div>
            <div className="youtubeSelfComment">
              <img
                className="video_youtubeSelfCommentProfile"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKfnkP7q5_q0XyOsHmTf4WWp0HJEq3XYzvag&s"
                alt=""
              />
              <div className="addAComment">
                <input
                  type="text"
                  className="addAcommentInput"
                  placeholder="Add a comment..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="cancelSubmitComment">
                  <div className="cancelComment">Cancel</div>
                  <div className="cancelComment" onClick={handleComment}>
                    Comment
                  </div>
                </div>
              </div>
            </div>
            <div className="youtubeOthersComments">
              {comments.map((item) => (
                <div className="youtubeSelfComment" key={item._id}>
                  <img
                    className="video_youtubeSelfCommentProfile"
                    src={item?.user?.profilePic}
                    alt=""
                  />
                  <div className="others_commentSection">
                    <div className="others_commentSectionHeader">
                      <div className="channelName_comment">
                        {item?.user?.channelName}
                      </div>
                      <div className="commentTimingOthers">
                        {item?.createdAt.slice(0, 10)}
                      </div>

                      {item?.user?._id === userId && (
                        <div className="commentActions">
                          <AiFillEdit
                            style={{ cursor: "pointer", fontSize: "25px" }}
                            onClick={() => {
                              setEditingCommentId(item._id);
                              setEditMessage(item.message);
                            }}
                          />
                          <AiFillDelete
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "25px",
                            }}
                            onClick={() => handleDeleteComment(item._id)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="otherCommentSectionComment">
                      {editingCommentId === item._id ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <input
                            type="text"
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            style={{ flex: 1 }}
                            autoFocus
                          />
                          <button onClick={() => handleEditComment(item._id)}>
                            Save
                          </button>
                          <button onClick={() => setEditingCommentId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        item?.message
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="videoSuggestions">
        {suggestions.map((item) => (
          <Link
            to={`/watch/${item._id}`}
            className="videoSuggestionsBlock"
            key={item._id}
          >
            <div className="video_suggetion_thumbnail">
              <img
                className="video_suggetion_thumbnail_img"
                src={item.thumbnail}
                alt={item.title}
              />
            </div>
            <div className="video_suggetions_About">
              <div className="video_suggetions_About_title">{item.title}</div>
              <div className="video_suggetions_About_Profile">
                {item?.user?.channelName}
              </div>
              <div className="video_suggetions_About_Profile">
                {item.like} likes
              </div>
            </div>
          </Link>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Video;
