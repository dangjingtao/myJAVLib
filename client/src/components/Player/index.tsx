import VideoJS from "./lib";
export default function index(props) {
  return (
    <>
      <VideoJS
        options={{
          //   aspectRatio: "vjs-16-9",

          //   height: 400,
          //   src: "video:///Users/tao/Desktop/jav_spider/source/achj-012.mp4",
          sources: [
            // fileSchemaUrl("/Users/tao/Desktop/jav_spider/source/achj-012.mp4"),
            // "/BMYB-104.mp4",
            // { src: "/BMYB-104.mp4", type: "mp4" },
            // fileSchemaUrl("/Users/tao/Desktop/jav_spider/source/achj-012.mp4"),
          ],
          //   autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          ...props,
        }}
        onReady={(player) => {
          //   player.requestFullscreen();
          player.src(props.src);
        }}
      />
    </>
  );
}
