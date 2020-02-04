import Vue from "vue";
import Router from "vue-router";
import Index from "../views/Index.vue";
import Main from "../views/Main.vue";
import Video from "../views/Video.vue";
import NotFound from "../views/NotFound.vue";
import Clips from "../views/Clips.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/404",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "/:streamer",
      name: "main",
      component: Main,
      params: true
    },
    {
      path: "/:streamer/video/:uuid",
      name: "video-player.vue",
      component: Video,
      params: true
    },
    {
      path: "/clips/:streamer/video/:uuid",
      name: "video-player.vue",
      component: Clips,
      params: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/404") next();
  else if (to.params.streamer && Vue.prototype.$streamers.indexOf(to.params.streamer) !== -1) next();
  else next({ name: "NotFound" });
});

export default router;
