<!--  -->
<template>
  <div class="details-container">
    <normalHeader></normalHeader>
    <div class="bkimg">
      <div class="all">
        <div class="alltitle">{{ data.title }}</div>
        <div class="allcontent">
          <div class="time">
            <span class="iconfont icon-rili2" style="margin-right: 15px"
              ><span>发表时间：{{ data.created_at }}</span>
            </span>
            <span
              class="iconfont icon-shijian-xianxing"
              style="margin-right: 15px"
              ><span>更新时间：{{ data.updated_at }}</span></span
            >
            <span class="iconfont icon-declare" style="margin-right: 15px"
              ><span>{{ type }}</span>
            </span>
          </div>

          <div class="two">
            <span
              style="margin-right: 5px"
              class="iconfont icon-fenlei-copy"
              v-for="p in data.tags"
              :key="p.id"
            >
              <span class="last">{{ p.name }}</span>
            </span>
            <span
              class="sort sub"
              style="margin-left: 10px; margin-right: 15px"
            >
              <span class="iconfont icon-fenlei1">
                <span>{{ data.category.name }}</span>
              </span>
            </span>
            <span class="iconfont icon-1fuwenben" style="margin-right: 15px"
              ><span>{{ data.word_count }}</span>
            </span>
            <span class="iconfont icon-41shuoshuo" style="margin-right: 15px"
              ><span>{{ data.comment_count }}</span>
            </span>
            <span class="iconfont icon-dianzan" style="margin-right: 15px"
              ><span>{{ articleLikeNumber }}</span>
            </span>
            <span
              class="iconfont icon-liulan"
              style="margin-right: 15px; font-size: 18px"
              ><span>{{ data.view_count }}</span>
            </span>
          </div>
          <div v-if="type === '转载'" class="reprint">
            本文转自{{ data.original_url }}
          </div>
        </div>
      </div>
      <el-image :src="data.img" id="bannerImg" class="img4" lazy>
        <div class="loader" slot="placeholder">
          <div class="load"></div>
        </div>
        <div slot="error" class="image-slot error">
          <div class="error"></div>
        </div>
      </el-image>
    </div>
    <div class="content">
      <div class="left" ref="left">
        <div class="context self article">
          <div
            class="ht markdown-body"
            id="content"
            v-html="data.content"
            ref="hight"
            v-highlight
          ></div>
          <div class="L-N">
            <router-link
              :to="'/articles/' + data.last_article.id"
              class="last together"
              v-if="data.last_article.id"
            >
              <div class="tip">
                <el-image :src="data.last_article.img" class="img3" lazy>
                  <div class="loader" slot="placeholder">
                    <div class="load"></div>
                  </div>
                  <div slot="error" class="image-slot error">
                    <el-empty
                      description="图片不见了~"
                      :image-size="60"
                    ></el-empty>
                  </div>
                </el-image>
                <div class="pre">
                  <span class="iconfont icon--shangyibu"></span> 上一篇
                </div>
              </div>
              <h1>{{ data.last_article.title }}</h1>
              <div class="mask"></div>
              <div class="newTitle">{{ data.last_article.title }}</div>
              <div class="bottom">
                <div class="newTime">{{ data.last_article.created_at }}</div>
                <div class="count">
                  <div class="view">
                    <span class="iconfont icon-liulan"></span>
                    <p>{{ data.last_article.view_count }}</p>
                  </div>
                  <div class="like">
                    <span class="iconfont icon-dianzan"></span>
                    <p>{{ data.last_article.like_count }}</p>
                  </div>
                </div>
              </div>
            </router-link>
            <span class="span" v-else>很遗憾,没有上一篇咯！</span>
            <span class="likexin">
              <span class="require">点</span>
              <span class="require" style="transition-delay: 50ms">个</span>
              <span class="require" style="transition-delay: 100ms">赞</span>
              <span class="require" style="transition-delay: 150ms">吧</span>
              <span class="require" style="transition-delay: 200ms">~</span>
              <label class="xin">
                <input
                  type="checkbox"
                  id="checkbox"
                  hidden
                  ref="like"
                  @click.prevent="articleLike"
                  :checked="articleisLiked"
                />
                <svg
                  t="1639041971928"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3128"
                >
                  <path
                    d="M512 896a42.666667 42.666667 0 0 1-30.293333-12.373333l-331.52-331.946667a224.426667 224.426667 0 0 1 0-315.733333 223.573333 223.573333 0 0 1 315.733333 0L512 282.026667l46.08-46.08a223.573333 223.573333 0 0 1 315.733333 0 224.426667 224.426667 0 0 1 0 315.733333l-331.52 331.946667A42.666667 42.666667 0 0 1 512 896z"
                    p-id="3129"
                    id="heart"
                  ></path>
                </svg>
                <span></span>
              </label>
              <span class="count">{{ articleLikeNumber }}</span>
            </span>
            <router-link
              :to="'/articles/' + data.next_article.id"
              class="naxt together"
              v-if="data.next_article.id"
            >
              <div class="tip">
                <el-image :src="data.next_article.img" class="img3" lazy>
                  <div class="loader" slot="placeholder">
                    <div class="load"></div>
                  </div>
                  <div slot="error" class="image-slot error">
                    <el-empty
                      description="图片不见了~"
                      :image-size="60"
                    ></el-empty>
                  </div>
                </el-image>
                <div class="next">
                  下一篇 <span class="iconfont icon--xiayibu"></span>
                </div>
              </div>
              <h1>{{ data.next_article.title }}</h1>
              <div class="mask"></div>
              <div class="newTitle">{{ data.next_article.title }}</div>
              <div class="bottom">
                <div class="newTime">{{ data.next_article.created_at }}</div>
                <div class="count">
                  <div class="view">
                    <span class="iconfont icon-liulan"></span>
                    <p>{{ data.next_article.view_count }}</p>
                  </div>
                  <div class="like">
                    <span class="iconfont icon-dianzan"></span>
                    <p>{{ data.next_article.like_count }}</p>
                  </div>
                </div>
              </div>
            </router-link>
            <span class="span" v-else>很遗憾,没有下一篇咯！</span>
          </div>
        </div>
        <div class="recommend self" v-if="data.recommend_articles.length">
          <span class="iconfont icon-tuijian"></span>
          <div class="head">
            <div class="hear1">
              <span class="iconfont icon-xihuan"></span
              ><span class="headtitle">推荐文章</span>
            </div>
          </div>
          <div class="content">
            <router-link
              :to="'/articles/' + item.id"
              class="rec together"
              v-for="item in data.recommend_articles"
              :key="item.id"
            >
              <div class="tip">
                <el-image :src="item.img" class="img1" lazy>
                  <div class="loader" slot="placeholder">
                    <div class="load"></div>
                  </div>
                  <div slot="error" class="image-slot error">
                    <el-empty
                      description="图片不见了~"
                      :image-size="100"
                    ></el-empty>
                  </div>
                </el-image>
              </div>
              <h1>{{ item.title }}</h1>
              <div class="mask"></div>
              <div class="newTitle">{{ item.title }}</div>
              <div class="bottom">
                <div class="newTime">{{ item.created_at }}</div>
                <div class="count">
                  <div class="view">
                    <span class="iconfont icon-liulan"></span>
                    <p>{{ item.view_count }}</p>
                  </div>
                  <div class="like">
                    <span class="iconfont icon-dianzan"></span>
                    <p>{{ item.like_count }}</p>
                  </div>
                </div>
              </div>
              <div class="more">
                <span class="seeMore">查看更多</span>
                <span class="iconfont icon-jiantou_yemian_xiangyou"></span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="comment self">
          <div class="head">
            <div class="left1">共{{ commentList.length }}条评论</div>
            <div class="right1">
              <span class="iconfont icon-41shuoshuo"></span> 评论区
            </div>
          </div>
          <div class="body">
            <div class="tipLogin" v-if="!Login">
              登录后才能评论和点赞哦！
              <button class="btn" @click="goLogin">
                <span class="btn-text-one">
                  <span
                    class="iconfont icon-denglu1"
                    style="
                      font-size: 23px;
                      display: inline-block;
                      transform: translateY(2px);
                    "
                  ></span>
                  <span class="login">去登录</span>
                </span>
                <span class="btn-text-two">Go!</span>
              </button>
            </div>
            <div class="hasLogin" v-if="Login">
              <div class="me">
                <div class="img">
                  <img :src="mycomment.avatar" alt="" />
                </div>
                <div class="introme">
                  <div class="nickname">{{ mycomment.nickname }}</div>
                  <div class="ip">IP属地:{{ mycomment.ip_source }}</div>
                </div>
              </div>
              <!-- <button class="emoji">emoji</button> -->
              <div class="commenting">
                <textarea
                  name=""
                  id=""
                  rows="5"
                  placeholder="我听见风吹过地铁和人海，我等着你朝着评论区走来~"
                  maxlength="300"
                  v-model="commentBig"
                  ref="bigArea"
                ></textarea>
                <span>{{ commentBig.length }}/300</span>
              </div>
              <el-button class="submit" type="primary" @click="sendMaster"
                >发布</el-button
              >
            </div>
            <div class="list">
              <div
                class="floor"
                v-for="(item, ind) in commentList"
                :key="item.id"
              >
                <div class="floorMaster">
                  <div class="left">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="right">
                    <div class="name">{{ item.nickname }}</div>
                    <div class="ip">IP属地:{{ item.ip_source }}</div>
                    <div class="content">
                      {{ item.content.replaceAll(" ", "&nbsp") }}
                    </div>
                    <div class="down">
                      <span class="timeco">{{ item.created_at }}</span>
                      <span class="like">
                        <label class="xin">
                          <input
                            type="checkbox"
                            id="checkbox"
                            hidden
                            ref="masterLike"
                            @click.prevent="masterLike(item.id, ind)"
                          />
                          <svg
                            t="1639041971928"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="3128"
                          >
                            <path
                              d="M512 896a42.666667 42.666667 0 0 1-30.293333-12.373333l-331.52-331.946667a224.426667 224.426667 0 0 1 0-315.733333 223.573333 223.573333 0 0 1 315.733333 0L512 282.026667l46.08-46.08a223.573333 223.573333 0 0 1 315.733333 0 224.426667 224.426667 0 0 1 0 315.733333l-331.52 331.946667A42.666667 42.666667 0 0 1 512 896z"
                              p-id="3129"
                              id="heart"
                            ></path>
                          </svg>
                          <span></span>
                        </label>
                        <span
                          style="
                            transform: translateY(-2.5px);
                            margin-left: -6px;
                            display: inline-block;
                          "
                        >
                          {{ masterCommentLikeNumber[ind] }}
                        </span>
                      </span>
                      <span class="reply">
                        <span class="iconfont icon-huifu"></span>
                        {{ item.reply_count }}
                      </span>
                      <div class="gotoReply" @click="gotoReply(ind)">
                        <span class="iconfont icon-icon_reply"></span>
                        回复
                      </div>
                    </div>
                    <transition name="bounce" mode="out-in">
                      <div class="replyFrame" v-show="masterReply[ind]">
                        <div class="myavatar">
                          <img :src="mycomment.avatar" alt="" />
                        </div>
                        <textarea
                          name=""
                          id=""
                          rows="3"
                          :placeholder="'回复@' + item.nickname + ':'"
                          maxlength="50"
                          v-model="commentReply[ind]"
                          ref="middle"
                        ></textarea>
                        <el-button
                          class="submit"
                          type="primary"
                          @click="sendReply(item.id, ind)"
                          >发布</el-button
                        >
                      </div>
                    </transition>
                  </div>
                </div>
                <div
                  class="floorReplyer"
                  v-for="(p, index) in item.reply_vo_list"
                  :key="p.id"
                >
                  <div class="aboutReplyer">
                    <div class="replyLeft">
                      <img :src="p.avatar" />
                      {{ p.avatar }}
                    </div>
                    <div class="replyRight">
                      <div class="first">
                        <div class="replyname">{{ p.nickname }}</div>
                        <div class="replyip">IP属地:{{ p.ip_source }}</div>
                      </div>
                      <div class="replycontent">{{ p.content }}</div>
                      <div class="replyBottom">
                        <span class="replyTime">{{ p.created_at }}</span>
                        <span class="reply">
                          <span class="iconfont icon-huifu"></span>
                          {{ p.reply_count }}
                        </span>
                        <div
                          class="gotoReply"
                          @click="gotosubReply(ind, index)"
                        >
                          <span class="iconfont icon-icon_reply"></span>
                          回复
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="floorinfloor"
                    v-for="sub in p.reply_vo_list"
                    :key="sub.id"
                  >
                    <div class="subLeft">
                      <div class="img">
                        <img :src="sub.avatar" alt="" />
                      </div>
                      <div class="nickname">{{ sub.nickname }}</div>
                      <div class="replyWho">
                        回复@{{ p.nickname }}
                        <span> :</span>
                      </div>
                    </div>
                    <div class="subRight">
                      <div class="content1">
                        {{ sub.content }}
                      </div>
                    </div>
                  </div>
                  <transition name="bounce" mode="out-in">
                    {{ ind }}
                    <div class="replyFrame" v-show="replyerReply[ind][index]">
                      <div class="myavatar">
                        <img :src="mycomment.avatar" alt="" />
                      </div>
                      <textarea
                        name=""
                        id=""
                        rows="3"
                        :placeholder="'回复@' + p.nickname + ':'"
                        maxlength="50"
                        v-model="commentFloor[ind][index]"
                      ></textarea>
                      <el-button
                        class="submit"
                        type="primary"
                        @click="sendFloor(p.id, ind, index)"
                        >发布</el-button
                      >
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right affix" ref="affix">
        <div class="new self">
          <span class="iconfont icon-new"></span>
          <div class="head">
            <span class="iconfont icon-shijian"></span
            ><span class="headtitle">最新文章</span>
          </div>
          <router-link
            @click.native="testReload(item.id)"
            :to="'/articles/' + item.id"
            class="newArticle"
            v-for="item in data.newest_articles"
          >
            <el-image :src="item.img" class="img2" lazy>
              <div class="loader" slot="placeholder">
                <div class="load"></div>
              </div>
              <div slot="error" class="image-slot error">
                <el-empty
                  class="rightEmpty"
                  description="图片不见了~"
                  :image-size="50"
                ></el-empty>
              </div>
            </el-image>
            <div class="newTitle">{{ item.title }}</div>
            <div class="bottom">
              <div class="newTime">{{ item.created_at }}</div>
              <div class="count">
                <div class="view">
                  <span class="iconfont icon-liulan"></span>
                  <p>{{ item.view_count }}</p>
                </div>
                <div class="like">
                  <span class="iconfont icon-dianzan"></span>
                  <p>{{ item.like_count }}</p>
                </div>
              </div>
            </div>
            <div class="mask"></div>
            <div class="more">
              <span class="seeMore">查看更多</span>
              <span class="iconfont icon-jiantou_yemian_xiangyou"></span>
            </div>
            <!-- <div class="iconfont">{{ item.created_at }}</div> -->
          </router-link>
        </div>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import rgb from "@/hooks/rgb.js";
import pickColor from "@/utils/pickColor";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import marked from "@/hooks/marked";
import normalHeader from "@/components/normalize/normalize-head.vue";
import normalFooter from "@/components/normalize/normalize-footer.vue";
import router from "@/router";
import { Affix } from "iview";
import { set } from "nprogress";
export default {
  data() {
    return {
      color1: "",
      color2: "",
      cc: "#fff",
      copyList: [],
      str: "1212",
      control: true,
      masterisLiked: "",
      articleisLiked: "",
      replyCommentLikeNumber: "",
      masterCommentLikeNumber: [],
      articleLikeNumber: "",
      Login: "",
      type: "",
      commentReply: [],
      commentFloor: [[]],
      replyerReply: [],
      masterReply: [],
      commentBig: "",
      top: "",
      scrollTop: "",
      bkimg: "",
      data: {},
      commentList: [],
      mycomment: {},
    };
  },
  props: ["id"],
  components: {
    normalFooter,
    normalHeader,
    router,
    Affix,
  },
  watch: {
    commenting() {
      var reg = /[^\S]/;
      this.commenting = this.commenting.replace(reg, "");
    },
  },
  async created() {
    let token = this.$cookies.get("token");
    await this.$http
      .post(
        `/article/${this.id}/islike`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "OK") {
          this.articleisLiked = res.data.data;
        } else {
        }
      })
      .catch((Error) => {});
    await this.$http
      .post(
        `/footstep/${this.id}`,
        {
          article_id: this.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {})
      .catch((Error) => {});
    await this.$http
      .get(`/comment/list`, {
        params: {
          topic_id: this.id,
        },
      })
      .then((res) => {
        this.commentList = res.data.data;
        var i;
        for (i = 0; i < this.commentList.length; i++) {
          this.masterCommentLikeNumber[i] = this.commentList[i].like_count;
        }
        this.replyCommentLikeNumber = this.commentList.reply_vo_list.like_count;
      })
      .catch((Error) => {});
    await this.$http
      .get(`/article/${this.id}`, {}, {})
      .then((res) => {
        var rendererMD = new marked.Renderer();
        marked.setOptions({
          renderer: rendererMD,
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          highlight: function (code) {
            return hljs.highlight("javascript", code).value;
          },
        }); //基本设置

        this.data = res.data.data;
        this.str = this.data.content;
        this.data.content = marked(this.data.content);
        this.data.content = this.data.content.replaceAll(
          "<ul>",
          '<ul class="ul">'
        );
        this.type = this.data.type === "1" ? "原创" : "转载";
        this.articleLikeNumber = this.data.like_count;
      })
      .catch((Error) => {});
    this.$http
      .post(
        "/user/info",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        this.mycomment = res.data.data;
      })
      .catch((Error) => {});
  },
  mounted() {
    setTimeout(() => {
      var str;
      var codeList = document.querySelectorAll("pre");
      var buttonList = document.getElementsByClassName("copy");
      //去重
      var newBtn = [];
      var index;
      for (index = 0; index < buttonList.length; index++) {
        if (index % 2 === 1) {
          newBtn.push(buttonList[index]);
        }
      }
      var i;
      for (i = 0; i < newBtn.length; i++) {
        newBtn[i].setAttribute("data-mark", i);
        newBtn[i].setAttribute("data-mark", i);
        newBtn[i].addEventListener("click", (e) => {
          if (
            e.target.hasAttribute("data-mark") ||
            e.target.parentNode.hasAttribute("data-mark")
          ) {
            i =
              e.target.getAttribute("data-mark") ||
              e.target.parentNode.getAttribute("data-mark");
            var num = codeList[i].querySelector("ul").innerText;
            var btn = codeList[i].querySelector("button.copy").innerText;
            str = codeList[i].innerText.replaceAll(num, "");
            str = str.replaceAll(btn, "");
            str = str.trim("\n");
            navigator.clipboard.writeText(str);
            if (this.control) {
              this.control = false;
              setTimeout(() => {
                this.control = true;
              }, 2000);
              this.$Message.success("复制成功！", 2);
            }
            this.$copyText(this.copyList[i]);
          }
        });
      }
    }, 2000);
    var fn = () => {
      var assTop = this.$refs.left.offsetTop;
      if (document.documentElement.scrollTop <= assTop - 30) {
        this.$refs.affix.classList.remove("affix1");
        console.log(2);
      } else {
        this.$refs.affix.classList.add("affix1");
        console.log(1);
      }
      if (
        this.$refs.left.scrollHeight - document.documentElement.scrollTop <
        240
      ) {
        this.$refs.affix.classList.remove("affix1");
        this.$refs.affix.classList.add("affix2");
        this.$refs.affix.style.top = this.$refs.left.scrollHeight - 240 + "px";
      } else if (document.documentElement.scrollTop > assTop - 30) {
        this.$refs.affix.classList.add("affix1");
        this.$refs.affix.style.top = "30px";
        this.$refs.affix.classList.remove("affix2");
      }
      if (document.documentElement.scrollTop <= assTop - 30) {
        this.$refs.affix.classList.remove("affix2");
      }
    };
    window.addEventListener("scroll", () => {
      fn();
    });
    this.Login = this.$cookies.get("isLogin");
    var self = this;
    var i, j;
    for (i = 0; i < 100; i++) {
      self.$set(self.masterReply, i, false);
      self.$set(self.replyerReply, i, []);
      self.$set(self.commentFloor, i, []);
      for (j = 0; j < 100; j++) {
        self.$set(self.replyerReply[i], j, false);
        self.$set(self.commentFloor[i], j, "");
      }
    }
  },

  computed: {},

  methods: {
    testReload(id) {
      location.reload();
    },
    // rgb背景色转十六进制#xxxxxx;
    getHexBgColor(bg) {
      var str = [];
      var rgb = bg.split("(");
      for (var k = 0; k < 3; k++) {
        str[k] = parseInt(rgb[1].split(",")[k]).toString(16);
      }
      str = "#" + str[0] + str[1] + str[2];
      return str;
    },

    onchange(index) {
      this.getImgColor(this.images[index].url);
    },

    //获取图片主题色
    getImgColor(_img) {
      var _this = this;
      var img = _img;
      RGBaster.colors(img, {
        paletteSize: 10, //调色板大小（可选项）
        exclude: ["rgb(0,0,0)", "rgb(255,255,255)", "rgb(254,254,254)"], //剔除的颜色
        success: function (payload) {
          // payload.dominant是主色，RGB形式表示
          // payload.secondary是次色，RGB形式表示
          // payload.palette是调色板，含多个主要颜色，数组
          _this.color1 = _this.getHexBgColor(payload.dominant);
          _this.color2 = _this.getHexBgColor(payload.secondary);
        },
      });
    },
    async articleLike() {
      let token = this.$cookies.get("token");
      await this.$http
        .post(
          `/article/like/${this.id}`,
          { article_id: this.id },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "OK") {
            if (!this.$refs.like.checked) {
              this.articleLikeNumber++;
              this.$refs.like.checked = true;
            } else {
              this.articleLikeNumber--;
              this.$refs.like.checked = false;
            }
          } else {
            this.$Notice.error({
              title: "还没有登陆不能点赞哦！",
              desc: "登陆信息可能过期或者没有登陆哦！重新登陆试试吧~",
            });
          }
        })
        .catch((Error) => {
          this.$Notice.error({
            title: "服务器请求繁忙！",
            desc: "很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧",
          });
        });
    },
    async masterLike(id, ind) {
      let token = this.$cookies.get("token");
      await this.$http
        .post(
          `/comment/like/${id}`,
          { id: id },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "OK") {
            if (!this.$refs.masterLike[id].checked) {
              this.masterCommentLikeNumber[ind]++;
              this.$refs.masterLike[id].checked = true;
            } else {
              this.masterCommentLikeNumber[ind]--;
              this.$refs.masterLike[id].checked = false;
            }
          } else {
            this.$Notice.error({
              title: "还没有登陆不能点赞哦！",
              desc: "登陆信息可能过期或者没有登陆哦！重新登陆试试吧~",
            });
          }
        })
        .catch((Error) => {
          this.$Notice.error({
            title: "服务器请求繁忙！",
            desc: "很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧",
          });
        });
    },
    async replyLike() {
      let token = this.$cookies.get("token");
      await this.$http
        .post(
          `/article/like/${this.id}`,
          { article_id: this.id },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "OK") {
            if (!this.$refs.like.checked) {
              this.articleLikeNumber++;
              this.$refs.like.checked = true;
            } else {
              this.articleLikeNumber--;
              this.$refs.like.checked = false;
            }
          } else {
            this.$Notice.error({
              title: "还没有登陆不能点赞哦！",
              desc: "登陆信息可能过期或者没有登陆哦！重新登陆试试吧~",
            });
          }
        })
        .catch((Error) => {
          this.$Notice.error({
            title: "服务器请求繁忙！",
            desc: "很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧",
          });
        });
    },
    goLogin() {
      this.$router.push("/login");
    },
    sendFloor(id, ind, index) {
      if (this.commentFloor[ind][index] !== "") {
        let token = this.$cookies.get("token");
        this.$http
          .post(
            "/comment",
            {
              parent_id: id,
              content: this.commentFloor[ind][index],
              topic_id: parseInt(this.id),
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            this.$http
              .get("/comment/list", {
                params: {
                  topic_id: this.id,
                },
              })
              .then((res) => {
                this.commentList = res.data.data;
              })
              .catch((Error) => {});
            this.commentFloor[ind][index] = "";
          })
          .catch((Error) => {
            this.$Notice.error({
              title: "服务器请求繁忙！",
              desc: "很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧",
            });
          });
      }
    },
    sendReply(id, index) {
      if (this.commentReply[index] !== "") {
        let token = this.$cookies.get("token");
        this.$http
          .post(
            "/comment",
            {
              parent_id: id,
              content: this.commentReply[index],
              topic_id: parseInt(this.id),
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            this.$http
              .get("/comment/list", {
                params: {
                  topic_id: this.id,
                },
              })
              .then((res) => {
                this.commentList = res.data.data;
              })
              .catch((Error) => {});
            this.commentReply[index] = "";
          })
          .catch((Error) => {
            this.$Notice.error({
              title: "服务器请求繁忙！",
              desc: "很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧",
            });
          });
      }
    },
    sendMaster() {
      if (this.commentBig !== "") {
        let token = this.$cookies.get("token");
        this.$http
          .post(
            "/comment",
            {
              parent_id: 0,
              content: this.commentBig,
              topic_id: parseInt(this.id),
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            this.$http
              .get("/comment/list", {
                params: {
                  topic_id: this.id,
                },
              })
              .then((res) => {
                this.commentList = res.data.data;
              })
              .catch((Error) => {});
            this.commentBig = "";
          })
          .catch((Error) => {
            this.$Notice.error({
              title: "服务器请求繁忙！",
              desc: "很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧",
            });
          });
      }
    },
    gotoReply(i) {
      let token = this.$cookies.get("token");
      if (token) {
        this.$set(this.masterReply, i, !this.masterReply[i]);
      } else {
        this.$Notice.error({
          title: "还没有登陆不能发表你的看法哦！",
          desc: "登陆信息可能过期或者没有登陆哦！重新登陆试试吧~",
        });
      }
    },
    gotosubReply(ind, index) {
      let token = this.$cookies.get("token");
      if (token) {
        this.$set(
          this.replyerReply[ind],
          index,
          !this.replyerReply[ind][index]
        );
      } else {
        this.$Notice.error({
          title: "还没有登陆不能发表你的看法哦！",
          desc: "登陆信息可能过期或者没有登陆哦！重新登陆试试吧~",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.img1 {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100%;

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);

    span {
      color: rgb(176, 176, 176);
      font-weight: 500;
      font-size: 16px;
    }

    .iconfont {
      font-size: 24px;
      transform: translateY(1.5px);
      margin-left: 4px;
    }
  }

  /deep/.loader {
    background-color: rgb(244, 244, 244);
    position: relative;
    transform: translate(-0.8em);
    color: hsl(0, 0%, 61%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 315px;
    height: 100%;

    .load {
      display: inline-block;
      position: relative;
      position: absolute;
      transform: rotate(165deg) translate(-20px, -20px);
    }

    .load:before,
    .load:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 0.25em;
      transform: translate(-50%, -50%);
    }

    .load:before {
      animation: before8 2s infinite;
    }

    .load:after {
      animation: after6 2s infinite;
    }

    @keyframes before8 {
      0% {
        width: 0.5em;
        box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
          -1em 0.5em rgba(111, 202, 220, 0.75);
      }

      35% {
        width: 2.5em;
        box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
          0 0.5em rgba(111, 202, 220, 0.75);
      }

      70% {
        width: 0.5em;
        box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
          1em 0.5em rgba(111, 202, 220, 0.75);
      }

      100% {
        box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
          -1em 0.5em rgba(111, 202, 220, 0.75);
      }
    }

    @keyframes after6 {
      0% {
        height: 0.5em;
        box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
          -0.5em -1em rgba(233, 169, 32, 0.75);
      }

      35% {
        height: 2.5em;
        box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
          -0.5em 0 rgba(233, 169, 32, 0.75);
      }

      70% {
        height: 0.5em;
        box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
          -0.5em 1em rgba(233, 169, 32, 0.75);
      }

      100% {
        box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
          -0.5em -1em rgba(233, 169, 32, 0.75);
      }
    }

    .load {
      position: absolute;
      top: calc(50% - 1.25em);
      left: calc(50% - 1.25em);
    }
  }
}

.rightEmpty {
  font-size: 13px;
}

.img2 {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100%;

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);

    span {
      color: rgb(176, 176, 176);
      font-weight: 500;
      font-size: 16px;
    }

    .iconfont {
      font-size: 24px;
      transform: translateY(1.5px);
      margin-left: 4px;
    }
  }

  /deep/.loader {
    background-color: rgb(244, 244, 244);
    position: relative;
    color: hsl(0, 0%, 61%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .load {
      display: inline-block;
      position: relative;
      position: absolute;
      transform: rotate(165deg) translate(-15px, -20px);
    }

    .load:before,
    .load:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 0.25em;
      transform: translate(-50%, -50%);
    }

    .load:before {
      animation: before8 2s infinite;
    }

    .load:after {
      animation: after6 2s infinite;
    }

    @keyframes before8 {
      0% {
        width: 0.5em;
        box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
          -1em 0.5em rgba(111, 202, 220, 0.75);
      }

      35% {
        width: 2.5em;
        box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
          0 0.5em rgba(111, 202, 220, 0.75);
      }

      70% {
        width: 0.5em;
        box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
          1em 0.5em rgba(111, 202, 220, 0.75);
      }

      100% {
        box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
          -1em 0.5em rgba(111, 202, 220, 0.75);
      }
    }

    @keyframes after6 {
      0% {
        height: 0.5em;
        box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
          -0.5em -1em rgba(233, 169, 32, 0.75);
      }

      35% {
        height: 2.5em;
        box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
          -0.5em 0 rgba(233, 169, 32, 0.75);
      }

      70% {
        height: 0.5em;
        box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
          -0.5em 1em rgba(233, 169, 32, 0.75);
      }

      100% {
        box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
          -0.5em -1em rgba(233, 169, 32, 0.75);
      }
    }

    .load {
      position: absolute;
      top: calc(50% - 1.25em);
      left: calc(50% - 1.25em);
    }
  }
}

.img3 {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100%;

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);

    span {
      color: rgb(176, 176, 176);
      font-weight: 500;
      font-size: 16px;
    }

    .iconfont {
      font-size: 24px;
      transform: translateY(1.5px);
      margin-left: 4px;
    }
  }

  /deep/.loader {
    background-color: rgb(244, 244, 244);
    position: relative;
    color: hsl(0, 0%, 61%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .load {
      display: inline-block;
      position: relative;
      position: absolute;
      transform: rotate(165deg) translate(-15px, -20px) scale(0.9);
    }

    .load:before,
    .load:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 0.25em;
      transform: translate(-50%, -50%);
    }

    .load:before {
      animation: before8 2s infinite;
    }

    .load:after {
      animation: after6 2s infinite;
    }

    @keyframes before8 {
      0% {
        width: 0.5em;
        box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
          -1em 0.5em rgba(111, 202, 220, 0.75);
      }

      35% {
        width: 2.5em;
        box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
          0 0.5em rgba(111, 202, 220, 0.75);
      }

      70% {
        width: 0.5em;
        box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
          1em 0.5em rgba(111, 202, 220, 0.75);
      }

      100% {
        box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
          -1em 0.5em rgba(111, 202, 220, 0.75);
      }
    }

    @keyframes after6 {
      0% {
        height: 0.5em;
        box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
          -0.5em -1em rgba(233, 169, 32, 0.75);
      }

      35% {
        height: 2.5em;
        box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
          -0.5em 0 rgba(233, 169, 32, 0.75);
      }

      70% {
        height: 0.5em;
        box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
          -0.5em 1em rgba(233, 169, 32, 0.75);
      }

      100% {
        box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
          -0.5em -1em rgba(233, 169, 32, 0.75);
      }
    }

    .load {
      position: absolute;
      top: calc(50% - 1.25em);
      left: calc(50% - 1.25em);
    }
  }
}

.img4 {
  width: 100%;
  height: 100%;

  .error,
  .loader {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
  }
}

.copySuccess {
  padding: 0;
  font-size: larger;
  width: 100px;
}

@keyframes all {
  from {
    opacity: 0;
    transform: translateY(-200px);
  }

  to {
    opacity: 1;
  }
}

@keyframes goto {
  from {
    opacity: 0;
  }

  70% {
    opacity: 0;
    transform: translateY(-40px);
  }

  to {
    opacity: 1;
  }
}

@keyframes img {
  20% {
    opacity: 0;
    transform: translateY(-200px);
  }

  to {
    opacity: 1;
    transform: translate(0);
  }
}

.details-container {
  animation: all 1s;

  .affix1 {
    position: fixed;
    top: 30px;
    right: 102px;
    width: 300px;
  }

  .affix2 {
    position: absolute;
    right: 102px;
    width: 300px;
  }

  .self {
    padding: 30px 35px;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  .bkimg {
    animation: img 1s;
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    .all {
      // background-color: pink;
      padding-top: 60px;
      z-index: 2;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      // transform: translate(-50%, -100%);

      .alltitle {
        font-weight: 600;
        // margin-top: 200px;
        max-width: 700px;
        font-size: 40px;
        color: #000;
      }

      .allcontent {
        font-weight: 500;
        color: #000;
        margin-top: 5px;
        width: 550px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .iconfont {
          font-size: 16px;

          span {
            margin-left: 4px;
            font-size: 14px;
          }
        }

        .time {
          margin-top: 10px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reprint {
          margin-top: 20px;
          font-size: 14px;
          font-style: italic;
        }

        // background-color: pink;
      }
    }

    img {
      width: 100%;
    }
  }

  @keyframes banner {
    from {
      opacity: 0;
      transform: translate(-400px) rotateY(90deg);
    }

    to {
      opacity: 1;
    }
  }

  .content {
    animation: banner 1s;
    width: 1320px;
    margin: 30px auto;
    display: flex;
    // background-color: pink;
    // justify-content: center;

    .left {
      width: 1000px;
      font-size: 16px;

      .tipLogin {
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 20px;
        font-style: italic;
        position: absolute;
        left: 50%;
        transform: translate(-50%);

        .btn {
          transition: all 0.5s;
          width: 120px;
          height: 40px;
          background: linear-gradient(
            to top,
            orange,
            rgb(255, 170, 12),
            rgb(255, 182, 46)
          );
          color: #fff;
          border-radius: 5px;
          border: none;
          outline: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .btn:hover {
          background: linear-gradient(
            to top,
            rgb(255, 188, 62),
            rgb(253, 200, 102),
            rgb(255, 209, 125)
          );
        }
        .btn:active {
          background: linear-gradient(
            to top,
            rgb(255, 188, 62),
            rgb(253, 200, 102),
            rgb(255, 209, 125)
          );
        }
        .btn span {
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: top 0.5s;
        }

        .btn-text-one {
          position: absolute;
          width: 100%;
          top: 43%;
          left: 0;
          transform: translateY(-50%);
        }

        .btn-text-two {
          position: absolute;
          width: 100%;
          top: 150%;
          left: 0;
          transform: translateY(-50%);
        }

        .btn:hover .btn-text-one {
          top: -100%;
        }

        .btn:hover .btn-text-two {
          top: 50%;
          animation: scalego 0.5s infinite alternate ease-in-out;
        }

        @keyframes scalego {
          0% {
          }

          100% {
            transform: translateY(-50%) scale(1.1);
            letter-spacing: 0.05rem;
          }
        }
      }

      .context {
        display: flex;
        flex-direction: column;

        .L-N {
          display: flex;
          justify-content: space-between;
          align-items: end;
          width: 100%;
          color: white;
          // background-color: pink;
          height: 120px;
          margin-top: 30px;

          .likexin:hover .require {
            transform: translateY(-6px);
            color: #ff6b81;
          }

          .likexin {
            display: flex;
            align-items: center;
            border: 2px solid #ff6b81;
            border-radius: 10px;
            transform: translate(-10px);
            margin-bottom: 16px;
            padding: 10px 20px;
            font-weight: 600;
            color: rgb(68, 68, 68);

            .require {
              transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              font-size: 20px;
            }

            .count {
              display: inline-block;
              font-size: 30px;
              font-weight: 500;
            }

            @keyframes scale {
              0% {
                transform: scale(0.9) translateY(5px);
              }

              60% {
                transform: scale(1.1) translateY(-5px);
              }

              100% {
                transform: scale(1) translateY(0px);
              }
            }

            .xin {
              animation: scale 6s infinite alternate ease-in-out;
              margin-left: 10px;
              margin-right: 35px;
              display: inline-block;
              position: relative;
              cursor: pointer;
              --c: #ff6b81;
              width: 30px;

              svg {
                width: 60px;
              }

              #heart {
                /* 填充颜色 */
                fill: rgb(207, 207, 207);
                /* stroke属性可应用于任何种类的线条，文字和元素，就像一个圆的轮廓 */
                stroke: var(--c);
                /* 线条宽度 */
                stroke-width: 20px;
                /* 设置线条为虚线，虚线的长度 */
                stroke-dasharray: 2600;
                /* 线条的位移 */
                stroke-dashoffset: 2600;
                /* 端点为圆头 */
                stroke-linecap: round;
              }

              span {
                display: inline-block;
                width: 15px;
                height: 15px;
                background-color: transparent;
                border-radius: 50%;
                /* 绝对定位 居中 */
                position: absolute;
                top: 30%;
                left: 80%;
                transform: translate(-50%, -50%) scale(0);
                /* 设置各个方向的阴影 */
                /* 通过var函数调用自定义属性--c,设置阴影颜色 */
                box-shadow: 0 -40px 0 var(--c), 0 40px 0 var(--c),
                  -40px 0 0 var(--c), 40px 0 0 var(--c), 30px -30px 0 var(--c),
                  -30px -30px 0 var(--c), 30px 30px 0 var(--c),
                  -30px 30px 0 var(--c);
              }

              /* 勾选复选框执行各个动画 */
              #checkbox:checked + svg #heart {
                /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                animation: drawHeart 1s linear forwards;
              }

              #checkbox:checked ~ span {
                /* 执行动画: 动画名 时长 加速后减速 停留在最后一帧 */
                animation: blink 0.5s ease-in-out forwards;
                /* 动画延迟时间 */
                animation-delay: 0.85s;
              }

              #checkbox:checked + svg {
                /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                animation: beat 1.2s linear forwards;
              }

              label {
                /* 鼠标移入,光标变小手 */
                cursor: pointer;
              }

              /* 定义动画 */
              /* 画心的动画 */
              @keyframes drawHeart {
                0% {
                  stroke-dashoffset: 2600;
                }

                80% {
                  fill: #eee;
                  stroke-dashoffset: 0;
                }

                100% {
                  fill: var(--c);
                  stroke-dashoffset: 0;
                }
              }

              /* 小圆点闪出的动画 */
              @keyframes blink {
                0% {
                  transform: translate(-50%, -50%) scale(0.5);
                  opacity: 0.2;
                }

                80% {
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 0.6;
                }

                100% {
                  transform: translate(-50%, -50%) scale(2.1);
                  opacity: 0;
                }
              }

              /* 心跳动的动画 */
              @keyframes beat {
                0% {
                  transform: scale(1);
                }

                70% {
                  transform: scale(1);
                }

                80% {
                  transform: scale(1.2);
                }

                100% {
                  transform: scale(1);
                }
              }
            }
          }

          .span {
            font-style: italic;
            font-size: 20px;
            color: rgb(114, 114, 114);
            font-weight: 700;
          }

          .next {
            color: #fff;
            z-index: 2;
            position: absolute;
            top: 7px;
            right: 10px;
            font-size: 14px;

            .iconfont {
              font-size: 18px;
            }
          }

          .pre {
            color: #fff;
            z-index: 2;
            position: absolute;
            top: 7px;
            left: 10px;
            font-size: 14px;

            .iconfont {
              font-size: 18px;
            }
          }
        }
      }

      .recommend {
        .img1 {
          transition: all.5s;
        }

        margin-top: 20px;
        // height: 600px;
        position: relative;

        .icon-tuijian {
          animation: goto 1.5s;
          position: absolute;
          top: -15px;
          left: 0;
          font-size: 60px;
          color: orange;
        }

        @keyframes tran {
          50% {
            opacity: 0;
            transform: translate(50px);
          }

          100% {
            opacity: 1;
            transform: translate(0);
          }
        }

        .head {
          animation: tran 1.5s;
          width: 100%;
          margin-top: -15px;
          display: flex;
          font-weight: 600;
          color: #000;
          justify-content: end;
          align-items: center;
          border-bottom: 2px solid #ccc;

          .iconfont {
            color: #ff6b81;
            opacity: 0.8;
            font-size: 35px;
          }

          .headtitle {
            font-size: 19px;
            display: inline-block;
            margin-left: 5px;
            transform: translateY(-6px);
          }
        }

        .content {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          place-content: center;
          grid-row-gap: 15px;
          grid-column-gap: 14px;
          margin-bottom: 0px;

          .rec {
            width: 300px;
            height: 170px;

            .bottom {
              width: 280px;
            }
          }
        }
      }

      .comment {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;

        .head {
          width: 100%;
          display: flex;
          font-weight: 500;
          justify-content: space-between;
          height: 30px;
          color: #333;
          font-size: 18px;
          align-items: center;
          border-left: 4px solid #4fd73a;

          .left1 {
            margin-left: 5px;
          }

          .right1 {
            display: flex;
            align-items: center;

            .iconfont {
              color: #000;
              font-size: 25px;
              margin-right: 5px;
            }
          }
        }

        .body {
          position: relative;
          width: 100%;
          font-weight: 500;
          margin-top: 15px;

          .me {
            display: flex;
            align-items: center;

            .img {
              transition: all 0.5s;
              margin-right: 10px;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
            }

            img {
              transition: all 0.8s;
              width: 100%;
              height: 100%;
            }

            .img:hover {
              transform: rotate(360deg);
            }

            .img:hover img {
              transform: scale(1.2);
            }

            .introme {
              .nickname {
                font-weight: 600;
                font-size: 18px;
              }

              .ip {
                font-size: 12px;
              }
            }
          }

          // .emoji {
          //   cursor: pointer;
          //   position: absolute;
          //   right: 0;
          //   padding: 4px 10px;
          //   border: none;
          //   background-color: rgb(234, 234, 234);
          //   font-size: 14px;
          //   border-radius: 4px;
          //   top: 40px;
          // }

          .emoji:hover {
            background-color: rgb(226, 226, 226);
          }

          .submit {
            color: #fff;
            float: right;
            font-weight: 500;
            font-size: 16px;
            padding: 10px 15px;
            border: none;
            background-color: #00a5e0;
            margin-top: 10px;
          }

          .submit:hover {
            background-color: #12b5f1;
          }

          .commenting {
            margin-top: 20px;
            position: relative;

            span {
              color: #ccc;
              font-size: 14px;
              font-style: italic;
              position: absolute;
              right: 20px;
              bottom: 15px;
            }

            ::-webkit-scrollbar-track {
              height: 8px;
              background: gainsboro;
              border-radius: 4px;
            }

            /* Designing for scroll-bar */
            ::-webkit-scrollbar {
              height: 8px;

              width: 6px;
            }

            ::-webkit-scrollbar-thumb {
              height: 8px;

              background: #75daff;
              border-radius: 4px;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              height: 8px;

              background: #00bbff;
            }

            textarea {
              color: #000;
              font-size: 14px;
              transition: height 0.2s;

              outline: none;
              resize: none;
              width: 100%;
              height: 42px;
              border: none;
              padding: 10px 50px 10px 15px;
              background-color: rgb(234, 234, 234);
              border-radius: 6px;
            }
          }

          ::-webkit-input-placeholder {
            color: rgb(162, 162, 162);
          }

          textarea:palceholder {
            color: #ccc;
          }

          textarea:hover {
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 9px 55px 9px 14px;
          }

          textarea:focus {
            height: 150px;
            padding: 9px 14px;
            background-color: #fff;
            border: 1px solid #00a5e0;
          }

          .list {
            font-weight: 500;
            width: 100%;
            margin: 60px auto;
            margin-bottom: 0;

            .floor {
              border-top: 1px solid #ccc;
              width: 100%;

              .floorMaster {
                padding-bottom: 15px;
                position: relative;
                margin-top: 20px;
                display: flex;

                .left {
                  width: 90px;
                  height: 90px;
                  border-radius: 50%;
                  margin-right: -12px;
                  overflow: hidden;

                  img {
                    transition: all 0.5s;
                    width: 100%;
                    height: 100%;
                  }
                }

                .right {
                  .bounce-enter-active {
                    animation: bounce-in 0.5s;
                  }

                  .bounce-leave-active {
                    animation: bounce-in 0.5s reverse;
                  }

                  @keyframes bounce-in {
                    0% {
                      opacity: 0;
                      transform: scale(0.8);
                    }

                    50% {
                      opacity: 0.4;
                      transform: scale(1.1);
                    }

                    100% {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }

                  .replyFrame {
                    width: 785px;
                    margin-top: 10px;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;

                    .submit {
                      margin-left: 15px;
                      transform: translateY(-4px);
                      color: #fff;
                      float: right;
                      font-weight: 500;
                      font-size: 16px;
                      padding: 10px 15px;
                      border: none;
                      background-color: #00a5e0;
                      margin-top: 10px;
                    }

                    .submit:hover {
                      background-color: #12b5f1;
                    }

                    ::-webkit-scrollbar-track {
                      height: 8px;
                      background: gainsboro;
                      border-radius: 4px;
                    }

                    /* Designing for scroll-bar */
                    ::-webkit-scrollbar {
                      height: 8px;

                      width: 6px;
                    }

                    ::-webkit-scrollbar-thumb {
                      height: 8px;

                      background: #75daff;
                      border-radius: 4px;
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                      height: 8px;

                      background: #00bbff;
                    }

                    textarea {
                      margin-left: 10px;
                      color: #000;
                      font-size: 14px;
                      transition: height 0.2s;

                      outline: none;
                      resize: none;
                      width: 600px;
                      height: 39px;
                      border: none;
                      padding: 9px 50px 9px 11px;
                      background-color: rgb(234, 234, 234);
                      border-radius: 6px;
                    }

                    .myavatar {
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                      overflow: hidden;

                      img {
                        width: 100%;
                        height: 100%;
                        transition: all 0.5s;
                      }
                    }

                    ::-webkit-input-placeholder {
                      color: rgb(162, 162, 162);
                    }

                    textarea:palceholder {
                      color: #ccc;
                    }

                    textarea:hover {
                      background-color: #fff;
                      border: 1px solid #ccc;
                      padding: 8px 55px 8px 10px;
                    }

                    textarea:focus {
                      height: 70px;
                      padding: 8px 0px 8px 10px;
                      background-color: #fff;
                      border: 1px solid #00a5e0;
                    }
                  }

                  .name {
                    font-size: 20px;
                    font-weight: 600;
                  }

                  .ip {
                    font-size: 12px;
                    display: inline-block;
                    transform: translateY(-2px);
                  }

                  .content {
                    width: 815px;
                    margin: 0;
                    font-size: 16px;
                  }

                  .down {
                    color: rgb(109, 109, 109);
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    padding-top: 2px;
                  }

                  .timeco {
                    margin-right: 20px;
                    font-size: 14px;
                  }

                  .reply {
                    margin-left: 23px;

                    .iconfont {
                      font-size: 14px;
                      margin-right: 2px;
                    }
                  }

                  .gotoReply {
                    cursor: pointer;
                    position: absolute;
                    right: 20px;
                  }

                  .gotoReply:hover {
                    color: #00a5e0;
                  }

                  .xin {
                    display: inline-block;
                    transform: translateY(2px);
                    position: relative;
                    cursor: pointer;
                    --c: #ff6b81;
                    width: 30px;

                    svg {
                      width: 20px;
                    }

                    #heart {
                      /* 填充颜色 */
                      fill: rgb(207, 207, 207);
                      /* stroke属性可应用于任何种类的线条，文字和元素，就像一个圆的轮廓 */
                      stroke: var(--c);
                      /* 线条宽度 */
                      stroke-width: 20px;
                      /* 设置线条为虚线，虚线的长度 */
                      stroke-dasharray: 2600;
                      /* 线条的位移 */
                      stroke-dashoffset: 2600;
                      /* 端点为圆头 */
                      stroke-linecap: round;
                    }

                    span {
                      display: inline-block;
                      width: 6px;
                      height: 6px;
                      background-color: transparent;
                      border-radius: 50%;
                      /* 绝对定位 居中 */
                      position: absolute;
                      top: 20%;
                      left: 25%;
                      transform: translate(-50%, -50%) scale(0);
                      /* 设置各个方向的阴影 */
                      /* 通过var函数调用自定义属性--c,设置阴影颜色 */
                      box-shadow: 0 -20px 0 var(--c), 0 20px 0 var(--c),
                        -20px 0 0 var(--c), 20px 0 0 var(--c),
                        15px -15px 0 var(--c), -15px -15px 0 var(--c),
                        15px 15px 0 var(--c), -15px 15px 0 var(--c);
                    }

                    /* 勾选复选框执行各个动画 */
                    #checkbox:checked + svg #heart {
                      /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                      animation: drawHeart 1s linear forwards;
                    }

                    #checkbox:checked ~ span {
                      /* 执行动画: 动画名 时长 加速后减速 停留在最后一帧 */
                      animation: blink 0.5s ease-in-out forwards;
                      /* 动画延迟时间 */
                      animation-delay: 0.85s;
                    }

                    #checkbox:checked + svg {
                      /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                      animation: beat 1.2s linear forwards;
                    }

                    label {
                      /* 鼠标移入,光标变小手 */
                      cursor: pointer;
                    }

                    /* 定义动画 */
                    /* 画心的动画 */
                    @keyframes drawHeart {
                      0% {
                        stroke-dashoffset: 2600;
                      }

                      80% {
                        fill: #eee;
                        stroke-dashoffset: 0;
                      }

                      100% {
                        fill: var(--c);
                        stroke-dashoffset: 0;
                      }
                    }

                    /* 小圆点闪出的动画 */
                    @keyframes blink {
                      0% {
                        transform: scale(0.5);
                        opacity: 0.2;
                      }

                      80% {
                        transform: scale(1);
                        opacity: 0.6;
                      }

                      100% {
                        transform: scale(2.1);
                        opacity: 0;
                      }
                    }

                    /* 心跳动的动画 */
                    @keyframes beat {
                      0% {
                        transform: scale(1);
                      }

                      70% {
                        transform: scale(1);
                      }

                      80% {
                        transform: scale(1.2);
                      }

                      100% {
                        transform: scale(1);
                      }
                    }
                  }
                }
              }

              img:hover {
                transform: rotate(360deg) scale(1.2);
              }

              .floorReplyer {
                border-top: 1px solid #ccc;
                padding: 15px 20px;
                margin-left: 5%;
                width: 90%;

                .floorinfloor {
                  background-color: rgb(234, 234, 234);
                  width: 100%;
                  border-radius: 5px;
                  padding: 12px 10px;
                  margin-top: 10px;

                  .subLeft {
                    display: table;
                    zoom: 1;
                    transform: translateY(-5px);
                    height: 100%;
                    float: left;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    font-size: 14px;

                    .nickname {
                      font-weight: 600;
                      margin: 0 0 0 8px;
                    }

                    .replyWho {
                      span {
                        color: #000;
                      }

                      margin: 0 5px;
                      cursor: pointer;
                      color: #26a2ce;
                    }
                  }

                  .subRight {
                    overflow: hidden;
                    zoom: 1;

                    .content1 {
                      font-size: 14px;
                    }
                  }

                  .img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                      transition: all 0.5s;
                      width: 100%;
                      height: 100%;
                    }
                  }
                }

                .replyFrame {
                  width: 785px;
                  margin-top: 15px;
                  margin-left: 25px;
                  display: flex;
                  align-items: center;

                  .submit {
                    margin-left: 15px;
                    transform: translateY(-4px);
                    color: #fff;
                    float: right;
                    font-weight: 500;
                    font-size: 16px;
                    padding: 10px 15px;
                    border: none;
                    background-color: #00a5e0;
                    margin-top: 10px;
                  }

                  .submit:hover {
                    background-color: #12b5f1;
                  }

                  ::-webkit-scrollbar-track {
                    height: 8px;
                    background: gainsboro;
                    border-radius: 4px;
                  }

                  /* Designing for scroll-bar */
                  ::-webkit-scrollbar {
                    height: 8px;

                    width: 6px;
                  }

                  ::-webkit-scrollbar-thumb {
                    height: 8px;

                    background: #75daff;
                    border-radius: 4px;
                  }

                  /* Handle on hover */
                  ::-webkit-scrollbar-thumb:hover {
                    height: 8px;

                    background: #00bbff;
                  }

                  textarea {
                    margin-left: 10px;
                    color: #000;
                    font-size: 14px;
                    transition: height 0.2s;

                    outline: none;
                    resize: none;
                    width: 600px;
                    height: 39px;
                    border: none;
                    padding: 9px 50px 9px 11px;
                    background-color: rgb(234, 234, 234);
                    border-radius: 6px;
                  }

                  .myavatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                      width: 100%;
                      height: 100%;
                      transition: all 0.5s;
                    }
                  }

                  ::-webkit-input-placeholder {
                    color: rgb(162, 162, 162);
                  }

                  textarea:palceholder {
                    color: #ccc;
                  }

                  textarea:hover {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    padding: 8px 55px 8px 10px;
                  }

                  textarea:focus {
                    height: 70px;
                    padding: 8px 0px 8px 10px;
                    background-color: #fff;
                    border: 1px solid #00a5e0;
                  }
                }

                .bounce-enter-active {
                  animation: bounce-in 0.5s;
                }

                .bounce-leave-active {
                  animation: bounce-in 0.5s reverse;
                }

                @keyframes bounce-in {
                  0% {
                    opacity: 0;
                    transform: scale(0.8);
                  }

                  50% {
                    opacity: 0.4;
                    transform: scale(1.1);
                  }

                  100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                }

                // background-color: pink;

                .replyLeft {
                  float: left;
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                  overflow: hidden;

                  img {
                    transition: all 0.5s;
                    width: 100%;
                    height: 100%;
                  }
                }

                .replyRight {
                  position: relative;
                  margin-left: 55px;

                  .first {
                    display: flex;
                  }

                  .replyip {
                    display: inline-block;
                    font-size: 12px;
                    transform: translateY(4px) scale(0.85);
                  }

                  .replyname {
                    font-weight: 600;
                  }

                  .reply {
                    display: inline-block;
                    transform: translateY(1.5px);
                    margin-left: 15px;

                    .iconfont {
                      font-size: 13px;
                      margin-right: 2px;
                    }
                  }

                  .gotoReply {
                    cursor: pointer;
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                  }

                  .gotoReply:hover {
                    color: #00a5e0;
                  }

                  .replyBottom {
                    font-size: 13px;
                  }

                  .like {
                    display: inline-block;
                    transform: translateY(3px);
                  }

                  .xin {
                    margin-left: 15px;
                    display: inline-block;
                    transform: translateY(2px);
                    position: relative;
                    cursor: pointer;
                    --c: #ff6b81;
                    width: 30px;

                    svg {
                      width: 18px;
                    }

                    #heart {
                      /* 填充颜色 */
                      fill: rgb(207, 207, 207);
                      /* stroke属性可应用于任何种类的线条，文字和元素，就像一个圆的轮廓 */
                      stroke: var(--c);
                      /* 线条宽度 */
                      stroke-width: 20px;
                      /* 设置线条为虚线，虚线的长度 */
                      stroke-dasharray: 2600;
                      /* 线条的位移 */
                      stroke-dashoffset: 2600;
                      /* 端点为圆头 */
                      stroke-linecap: round;
                    }

                    span {
                      display: inline-block;
                      width: 6px;
                      height: 6px;
                      background-color: transparent;
                      border-radius: 50%;
                      /* 绝对定位 居中 */
                      position: absolute;
                      top: 23%;
                      left: 20%;
                      transform: translate(-50%, -50%) scale(0);
                      /* 设置各个方向的阴影 */
                      /* 通过var函数调用自定义属性--c,设置阴影颜色 */
                      box-shadow: 0 -20px 0 var(--c), 0 20px 0 var(--c),
                        -20px 0 0 var(--c), 20px 0 0 var(--c),
                        15px -15px 0 var(--c), -15px -15px 0 var(--c),
                        15px 15px 0 var(--c), -15px 15px 0 var(--c);
                    }

                    /* 勾选复选框执行各个动画 */
                    #checkbox:checked + svg #heart {
                      /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                      animation: drawHeart 1s linear forwards;
                    }

                    #checkbox:checked ~ span {
                      /* 执行动画: 动画名 时长 加速后减速 停留在最后一帧 */
                      animation: blink 0.5s ease-in-out forwards;
                      /* 动画延迟时间 */
                      animation-delay: 0.85s;
                    }

                    #checkbox:checked + svg {
                      /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                      animation: beat 1.2s linear forwards;
                    }

                    label {
                      /* 鼠标移入,光标变小手 */
                      cursor: pointer;
                    }

                    /* 定义动画 */
                    /* 画心的动画 */
                    @keyframes drawHeart {
                      0% {
                        stroke-dashoffset: 2600;
                      }

                      80% {
                        fill: #eee;
                        stroke-dashoffset: 0;
                      }

                      100% {
                        fill: var(--c);
                        stroke-dashoffset: 0;
                      }
                    }

                    /* 小圆点闪出的动画 */
                    @keyframes blink {
                      0% {
                        transform: scale(0.5);
                        opacity: 0.2;
                      }

                      80% {
                        transform: scale(1);
                        opacity: 0.6;
                      }

                      100% {
                        transform: scale(2.1);
                        opacity: 0;
                      }
                    }

                    /* 心跳动的动画 */
                    @keyframes beat {
                      0% {
                        transform: scale(1);
                      }

                      70% {
                        transform: scale(1);
                      }

                      80% {
                        transform: scale(1.2);
                      }

                      100% {
                        transform: scale(1);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .together {
      cursor: pointer;
      position: relative;
      width: 240px;
      border-radius: 10px;
      height: 120px;
      overflow: hidden;
      font-weight: 500;

      .mask {
        transition: all 0.5s;
        opacity: 0.5;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
      }

      .more {
        position: absolute;
        transition: all 0.6s;
        opacity: 0;
        right: -40px;
        top: 10px;
        font-size: 13px;
        font-weight: 600;
        color: rgb(255, 255, 255);

        .seeMore {
          display: inline-block;
          transform: translateY(-1.5px);
        }

        .iconfont {
          display: inline-block;
          animation: gonone 1s infinite;
        }

        @keyframes gonone {
          80% {
            transform: translate(5px);
            opacity: 0.3;
          }

          100% {
            transform: translate(10px);
            opacity: 0;
          }
        }
      }

      .newTitle {
        position: absolute;
        z-index: 2;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 210px;
        font-size: 17px;
        color: #fff;
        font-weight: 500;
        // background-color: pink;
        bottom: 25px;
        left: 10px;
      }

      .more {
        transition: all 0.6s;
        opacity: 0;
        right: -40px;
        top: 8px;
        font-weight: 600;
        color: rgb(255, 255, 255);

        .seeMore {
          display: inline-block;
          transform: translateY(-1.5px);
        }

        .iconfont {
          display: inline-block;
          animation: gonone 1s infinite;
        }

        @keyframes gonone {
          80% {
            transform: translate(5px);
            opacity: 0.3;
          }

          100% {
            transform: translate(10px);
            opacity: 0;
          }
        }
      }

      .bottom {
        position: absolute;
        display: flex;
        width: 220px;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        z-index: 2;
        font-weight: 500;
        bottom: 5px;
        left: 10px;
        color: white;

        .count {
          display: flex;

          .view,
          .like {
            display: flex;

            p {
              margin-left: 3px;
              transform: translateY(2px);
            }
          }

          .view {
            margin-right: 10px;
          }
        }
      }

      .tip {
        width: 100%;
        height: 100%;

        img {
          transition: all 0.5s;
          width: 100%;
        }
      }
    }

    .together:hover .mask {
      opacity: 1;
    }

    .together:hover .img1 {
      transform: scale(1.1);
    }

    .img3 {
      transition: all 0.5s;
    }

    .together:hover .img3 {
      transform: scale(1.1);
    }

    .together:hover .more {
      opacity: 1;
      right: 6px;
    }

    @keyframes right {
      from {
        opacity: 0;
        transform: translate(200px);
      }

      50% {
        opacity: 0;
        transform: translate(200px);
      }

      to {
        opacity: 1;
        transform: translate(0px);
      }
    }

    .right {
      animation: right 1.5s alternate;
      margin-left: 20px;
      width: 300px;

      .new {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        padding-top: 15px;
        padding-bottom: 20px;
        // margin-top: 20px;
        width: 300px;

        .icon-new {
          animation: goto 2s alternate;
          color: rgb(255, 102, 102);
          font-size: 45px;
          position: absolute;
          top: -12px;
          right: -2px;
        }

        @keyframes tran {
          50% {
            opacity: 0;
            transform: translate(-50px);
          }

          100% {
            opacity: 1;
            transform: translate(0);
          }
        }

        // height: 500px;
        .head {
          animation: tran 2s alternate;
          width: 110%;
          padding-bottom: 5px;
          border-bottom: 2px solid #ccc;

          span {
            font-weight: 600;
            font-size: 16px;
          }

          .headtitle {
            display: inline-block;
            transform: translate(4px, -2px);
          }

          .iconfont {
            font-weight: 600;
            font-size: 20px;
          }
        }

        .newArticle {
          position: relative;
          height: 110px;
          margin-top: 10px;
          border-radius: 6px;
          background-color: pink;
          overflow: hidden;
          width: 100%;

          .img2 {
            transition: all 0.4s;
            width: 100%;
          }

          .newTitle,
          .more {
            position: absolute;
          }

          .newTitle {
            z-index: 2;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 210px;
            font-size: 17px;
            color: #fff;
            font-weight: 500;
            // background-color: pink;
            bottom: 20px;
            left: 10px;
          }

          .bottom {
            position: absolute;
            display: flex;
            width: 210px;
            // background-color: pink;
            // align-items: center;
            line-height: 20px;
            justify-content: space-between;
            font-size: 13px;
            z-index: 2;
            font-weight: 500;
            bottom: 5px;
            left: 10px;
            color: white;

            .count {
              // width: 20px;
              display: flex;
              align-items: center;

              .view,
              .like {
                display: flex;
                align-items: center;
                text-align: center;

                p {
                  margin-left: 3px;
                  transform: translateY(1px);
                }
              }

              .view {
                margin-right: 10px;
              }
            }
          }

          .mask {
            opacity: 0.5;
            transition: all 0.5s;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
          }

          .more {
            transition: all 0.6s;
            opacity: 0;
            right: -40px;
            top: 8px;
            font-weight: 600;
            color: rgb(255, 255, 255);

            .seeMore {
              display: inline-block;
              transform: translateY(-1.5px);
            }

            .iconfont {
              display: inline-block;
              animation: gonone 1s infinite;
            }

            @keyframes gonone {
              80% {
                transform: translate(5px);
                opacity: 0.3;
              }

              100% {
                transform: translate(10px);
                opacity: 0;
              }
            }
          }
        }

        .newArticle:hover .img2 {
          transform: scale(1.1);
        }

        .newArticle:hover .more {
          opacity: 1;
          right: 6px;
        }

        .newArticle:hover .mask {
          opacity: 1;
        }
      }

      .catalogue {
        width: 300px;
        height: 250px;
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .affix {
    display: none;
  }
}
@media screen and (min-width: 1400px) {
  .affix {
    display: block;
  }
}
/deep/code {
  margin: 0 5px;
  border-radius: 3px;
  padding: 0 4px;
  background-color: #dddddd;
}

/deep/pre {
  code {
    background-color: #282c34;
    overflow: auto;
    padding: 9px;
    border-radius: 7px;
    padding-left: 40px;
    margin: 5px 0px;
  }

  code::-webkit-scrollbar-track {
    font-family: test;
    background: rgb(230, 230, 230);
  }

  code::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  code:-webkit-scrollbar-button {
    display: none;
  }

  code::-webkit-scrollbar-thumb {
    position: relative;
    background-color: rgb(185, 185, 185);
  }

  code::-webkit-scrollbar-thumb:hover {
    background-color: rgb(163, 163, 163);
  }

  code button {
    font-weight: 500;
    transition: all 0.3s;
    opacity: 0;
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 10px;
    padding: 1px 5px;
    border: 0;
    // box-shadow: 2px 2px 20px -2px #ccc;
    border-radius: 5px;
  }

  code button article {
    font-size: 20px;
  }

  code:hover button {
    opacity: 1;
  }
  code:focus button {
    opacity: 1;
  }
  code:active button {
    opacity: 1;
  }
  code button:hover .tip {
    opacity: 1;
  }

  code button:hover .de {
    opacity: 1;
  }
  code button:focus .tip {
    opacity: 1;
  }

  code button:focus .de {
    opacity: 1;
  }
  code button:active .tip {
    opacity: 1;
  }

  code button:active .de {
    opacity: 1;
  }
  code .tip {
    transition: all 0.3s;
    opacity: 0;
    padding: 2px 5px;
    border-radius: 3px;
    position: absolute;
    top: 130%;
    left: 0%;
    color: white;
    font-size: 12px;
    background-color: rgba(71, 66, 66, 0.75);
  }

  code .de {
    transition: all 0.3s;
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 80%);
    border: 7px solid transparent;
    border-bottom: 7px solid rgba(71, 66, 66, 0.75);
  }

  .pre-numbering {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 30px;
    border-radius: 7px;
    border-right: 1px solid #797979;
    background-color: #282c34;
    text-align: center;
    padding: 0.5em 0;
  }

  .pre-numbering ul {
    margin-left: 0 !important;
  }

  .pre-numbering li {
    margin-left: 0 !important;
    list-style: none !important;
    span {
      color: #ccc !important;
      font-size: 1em;
    }
  }

  position: relative;
}

/deep/.ht .ul {
  margin-left: 20px;
}

/deep/.ht img {
  width: 100%;
}

/deep/.ht ul li {
  // margin-left: 20px;
  list-style: decimal;
}

/deep/.ht ol li {
  // margin-left: 20px;
  // list-style: none;
  list-style: none;
}

// /deep/.ht ol{
//   margin-left: 20px;
//   list-style:decimal;
// }
</style>
