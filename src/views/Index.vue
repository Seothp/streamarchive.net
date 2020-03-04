<template>
  <div>
    <div class="d-inline-flex" style="position: relative" ref="page">
      <v-btn absolute fab flat class="toInfo" @click="$vuetify.goTo('#info')"><v-icon>arrow_downward</v-icon></v-btn>
      <v-hover class="pointer" v-for="[streamer, url] in streamers" :key="streamer" style="height: 100vh">
        <v-card
          slot-scope="{ hover }"
          :width="window.width / streamersLength"
          style="height: 100vh; border-radius: 0"
          class="elevation-0"
          ref="card"
        >
          <router-link :to="`/${streamer}`" tag="div" style="height: 100vh">
            <v-img :src="`${url}/img/${streamer}/main.jpg`" style="height: 100vh" v-on:error="handleImageError">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </template>

              <div class="hidden-sm-and-down">
                <transition name="half-fade">
                  <div v-if="!hover" class="grey overlap fill-height"></div>
                </transition>
                <transition name="fade">
                  <div v-if="hover" class="fill-height text-xs-center fill-width pt-5">
                    <span class="display-2 text-uppercase">{{ streamer }}</span>
                  </div>
                </transition>
              </div>
              <div class="hidden-md-and-up">
                <transition name="fade">
                  <div class="fill-height text-xs-center fill-width pt-5">
                    <span class="display-2 text-uppercase">{{ streamer }}</span>
                  </div>
                </transition>
              </div>
            </v-img>
          </router-link>
        </v-card>
      </v-hover>
    </div>
    <v-container fluid id="info">
      <div class="headline text-xs-center font-weight-bold text-uppercase fill-width">StreamArchive</div>
      <h2 class="display-1 d-block main-page-subtitle">О проекте</h2>
      <span class="body-1 d-block pb-3">
        Всем драсьте. Мы - маленькая команда OpenStreamArchive. Месяцы работы, тонны перекопанного кода (спасибо твичу)
        и вот он - StreamArchive. Идея проекта родилась когда мы потеряли звук части стрима с распаковкой альбома с
        пожеланиями от Утиной Армии. Теперь за новыми стримами следит специальный сервер и автоматически записывает их
        на лету, тем самым сохраняя всё. Конечно мы не можем гарантировать 100% надёжности как из-за того что проект
        создан любителями (но мы над этим работаем и стараемся сохранить всё), так и из-за того что сервер собран из
        говна и палок, лежавших без дела.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Вставка для экспертов IT</h2>
      <span class="body-1 d-block pb-3">
        Заливать на youtube бесполезно. Мы проверяли. 43 страйка из них 3 блокировки на 5 часовой стрим. И разгребать
        весь контент, что-то подменять и вырезать вручную при таких объемах вряд ли реализуемо в адекватные сроки.
        Google Photos - приличная часть видео не доступна в одном из старых архивов. VK - доступен не всем. Выделенный
        сервер, подходящий под нужды архива ~100$/месяц. Если у вас есть конкретные предложения - мы с радостью вас
        выслушаем.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Зачем это всё нужно?</h2>
      <span class="body-1 d-block pb-3">
        Потому что Твич хранит стримы 60 дней по партнёрке и 15 без неё. Так же в сохраненных видео у стримера могут
        быть пропущены фрагменты звука из-за прав на музыку.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Зачем нам деньги?</h2>
      <span class="body-1 d-block pb-3">
        Поскольку схема с хранением записей на домашнем сервере оказалась ненадёжной, было принято решение арендовать
        сервер с большим объёмом хранилища. В общей сложности сейчас это стоит около €80/мес и по мере накопления
        записей стоимость будет расти.
      </span>

      <h2 class="display-1 d-block main-page-subtitle">Вопросы и предложения</h2>
      <span class="body-1 d-block pb-3">
        <span class="d-block">
          Вопросы и пожелания вы можете пистать в лс -
          <a href="https://t.me/de_morgan" target="_blank" class="link bold">de_morgan</a>
        </span>
        <span class="d-block">Если вы хотите добавить стримера на хаб пишите ему же.</span>
        <span class="d-block">Рекордер/бэкэнд - DedKim</span>
        <span class="d-block">Фронтэнд - ohhHiMark, peyoter, Ejento</span>
        <span class="d-block">DevOps - sadmonad, DedKim</span>
        <span class="d-block">Дизайн - Anulyev, Bathammer, ohhHiMark</span>
        <span class="d-block">Тестирование - iamien1993, de_morgan</span>
        <span class="d-block">Отдельное спасибо: </span>
        <span class="d-block">wmw за помощь с API твича для стриминга видео</span>
        <span class="d-block">MyLittleZi за два 6TB винта и RAID контроллер</span>
        <span class="d-block">DrZoidberg, Olyashaa и мгогим другим, кто поддержал финансово</span>
        <span class="d-block">Ваша помощь неоценима.</span>
        <span class="d-block">Если тоже хотите помочь нам - перейдите на DA по кнопке в правом нижнем углу </span>
      </span>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      streamersLength: Object.entries(this.$endpoints).length
    };
  },
  created() {
    document.title = "StreamArchive - ЛУЧШИЙ АРХИВ ВО ВСЕЛЕННОЙ КСТА";
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    handleImageError: function(src) {
      const card = this.$refs.card[0];
      const imgSrc = this.$refs.card[0].$children[0].$children[0].$props.src;
      if (imgSrc === src) {
        card.$el.style.display = "none";
        this.streamersLength--;
      }
    }
  },
  computed: {
    streamers: function() {
      const streamers = Object.entries(this.$endpoints);
      return streamers;
    }
  }
};
</script>
