const getThumbnailURLFromMessage = (message) => {
    const linkRegex = /https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/g;
    const match = linkRegex.exec(message);
  
    if (match && match[0] && match[1]) {
      const videoId = match[1];
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } else {
      return null;
    }
  }

  module.exports = getThumbnailURLFromMessage;