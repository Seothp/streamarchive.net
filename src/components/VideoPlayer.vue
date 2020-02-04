<template>
  <div class="video-js">
    <video ref="videoPlayer" class="video-js"></video>
    <v-snackbar v-model="snackbar" :bottom="true" :timeout="2000">Ссылка скопирована!</v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import videojs from "video.js";
import "video.js/dist/video-js.css";
window.videojs = videojs;
require("videojs-hotkeys");
require("../assets/js/thumbnails/videojs.thumbnails.css");
require("../assets/js/thumbnails/videojs.thumbnails");
export default {
  name: "VideoPlayer",
  props: {
    currentTime: Number
  },
  data() {
    return {
      snackbar: false,
      player: null,
      options: {
        autoplay: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
        sources: [{ type: "application/x-mpegURL" }]
      }
    };
  },
  mounted() {
    let streamer = this.$route.params.streamer;
    let uuid = this.$route.params.uuid;
    let baseUrl = this.$endpoints[streamer];
    let vm = this;

    let url = `/streams/${uuid}`;
    let timelinePreviewUrl = `${baseUrl}/streams/${streamer}/${uuid}/timeline_preview/`;
    this.options.sources[0].src = `${baseUrl}/streams/${streamer}/${uuid}/index-dvr.m3u8`;

    this.player = videojs(this.$refs.videoPlayer, this.options, function() {
      let Button = videojs.getComponent("Button");
      let shareButton = videojs.extend(Button, {
        constructor() {
          Button.apply(this, arguments);
        },
        handleClick() {
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => (vm.snackbar = true))
            .catch(err => alert(err));
        },
        buildCSSClass: () => "vjs-control vjs-button vjs-menu-button vjs-icon-share"
      });
      videojs.registerComponent("shareButton", shareButton);

      let Component = videojs.getComponent("Component");
      let badge = videojs.extend(Component, {
        constructor() {
          Component.apply(this);
        },
        createEl() {
          let badgeClass = "text-uppercase font-weight-bold vjs-control px-2 hidden-xs-only";
          let el = videojs.dom.createEl("button", {}, { class: badgeClass });
          el.innerHTML = "StreamArchive";
          return el;
        }
      });
      videojs.registerComponent("badge", badge);

      let controlBar = this.controlBar;

      controlBar.addChild("shareButton");
      let insertedShareButton = controlBar.getChild("shareButton").el();
      let speedRate = controlBar.getChild("playbackRateMenuButton").el();
      controlBar.el().insertBefore(insertedShareButton, speedRate);

      controlBar.addChild("badge");
      let insertedBadge = controlBar.getChild("badge").el();
      let spacer = controlBar.getChild("customControlSpacer").el();
      controlBar.el().insertBefore(insertedBadge, spacer);

      // noinspection JSUnresolvedFunction
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        alwaysCaptureHotkeys: true,
        enableModifiersForNumbers: false
      });

      axios.get(process.env.VUE_APP_URL + url).then(response => {
        vm.$emit("info", response.data);
        let thumbnails = {};
        for (let i = 0; i <= response.data.duration; i++) thumbnails[i * 10] = { src: `preview${i}.jpg` };
        this["thumbnails"](thumbnails, timelinePreviewUrl);
      });
    });
    this.player.currentTime(this.currentTime);
  },
  beforeDestroy() {
    if (this.player) this.player.dispose();
  }
};
</script>

<style>
@import "../assets/css/vsg-skin.css";
.video-js {
  width: 100%;
  height: 100%;
}

.video-js * {
  user-select: none;
  outline-style: none;
}
</style>
