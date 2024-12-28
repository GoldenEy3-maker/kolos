//@ts-nocheck
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

import "./jquery.scrollbar.css";

import "jquery.scrollbar";

export default class PlansSlider {
  constructor() {
    $(document).ready(function () {
      let sliderParams = {
        loop: false,
        margin: 10,
        items: 1,
        nav: true,
        navContainerClass: "slider-nav",
        navText: [
          `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6581 24L21 24L13.9702 14.9899C12.2494 12.7843 12.188 11.9988 9.45991 11.9988L3 11.9988L10.0298 21.0089C11.7509 23.215 13.9297 24 16.6581 24Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6581 1.71756e-06L21 1.90735e-06L13.9702 9.01011C12.2494 11.2157 12.188 12.0012 9.45991 12.0012L3 12.0012L10.0298 2.99106C11.7509 0.784998 13.9297 1.59829e-06 16.6581 1.71756e-06Z" fill="currentColor"/>
          </svg>
`,
          `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.34194 24L3 24L10.0298 14.9899C11.7506 12.7843 11.812 11.9988 14.5401 11.9988L21 11.9988L13.9702 21.0089C12.2491 23.215 10.0703 24 7.34194 24Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.34194 1.71756e-06L3 1.90735e-06L10.0298 9.01011C11.7506 11.2157 11.812 12.0012 14.5401 12.0012L21 12.0012L13.9702 2.99106C12.2491 0.784998 10.0703 1.59829e-06 7.34194 1.71756e-06Z" fill="currentColor"/>
          </svg>
            `,
        ],
        navElement: "div",
        dotsClass: "slider-dots",
        dotClass: "slider-dot",
        navSpeed: 500,
        dotsSpeed: 500,
        dragEndSpeed: 500,
        responsiveClass: false,
        responsive: {
          0: {
            nav: false,
            dots: true,
          },
          992: {
            dots: false,
            nav: true,
          },
        },
      };
      let sliderItems = 0;
      let sliderCurrentItem = 0;

      sliderParams["onChanged"] = sliderChange;

      const slider = $(".home-layouts__slider").owlCarousel(sliderParams);

      $(".home-layouts__mini-blocks").scrollbar();

      //weather
      $(".first__weather-item").on("click", function () {
        if ($(this).hasClass("current")) return false;
        let indexEl = $(this).index();
        $(".first__weather-item").removeClass("current");
        $(this).addClass("current");
        if (indexEl) {
          $(".first__weather-bg").addClass("current");
          $(".first__img-item").eq(1).addClass("current");
        } else {
          $(".first__weather-bg").removeClass("current");
          $(".first__img-item").eq(1).removeClass("current");
        }
      });

      // if (process.env.NODE_ENV === "development") {
      var jsonObject = [
        [
          {
            title: "1-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.40-1.png",
              "img/plans/р-кв.40-1.png",
              "img/plans/кв.40.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "14.2",
          },
          {
            title: "1-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.41-1.png",
              "img/plans/р-кв.41-1.png",
              "img/plans/кв.41.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "14.9",
          },
          {
            title: "2-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.42-1.png",
              "img/plans/р-кв.42-1.png",
              "img/plans/кв.42.png",
            ],
            cost: "",
            rooms: "2",
            sqrtLive: "27.5",
          },
          {
            title: "1-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.43-1.png",
              "img/plans/р-кв.43-1.png",
              "img/plans/кв.43.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "14.2",
          },
          {
            title: "1-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.44-1.png",
              "img/plans/р-кв.44-1.png",
              "img/plans/кв.44.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "14.2",
          },
          {
            title: "1-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.45-1.png",
              "img/plans/р-кв.45-1.png",
              "img/plans/кв.45.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "15.3",
          },
          {
            title: "2-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.46-1.png",
              "img/plans/р-кв.46-1.png",
              "img/plans/кв.46.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "15.8",
          },
          {
            title: "1-комнатная квартира",
            dopCostInfo: "",
            img: [
              "img/plans/м-кв.47-1.png",
              "img/plans/р-кв.47-1.png",
              "img/plans/кв.47.png",
            ],
            cost: "",
            rooms: "1",
            sqrtLive: "15.3",
          },
        ],
      ];
      // }

      //home layout
      let layoutsObj = jsonObject;

      function sliderChange(e) {
        sliderItems = e.item.count;
        sliderCurrentItem = e.item.index;
        $(".home-layouts__text").removeClass("current");
        $(".home-layouts__text").eq(sliderCurrentItem).addClass("current");
        verticalScrollBlock(sliderCurrentItem);
      }

      function verticalScrollBlock(index) {
        if (index == null) {
          return false;
        }
        console.log(
          $(".home-layouts__mini-block").eq(index),
          $(".home-layouts__mini-block").eq(index).offset().top,
        );
        // let currentOffset = $('.home-layouts__mini-block').eq(index).offset().top -
        //                     $('.scroll-wrapper').offset().top;
        let currentOffset =
          (18 + $(".home-layouts__mini-block").innerHeight()) * (index - 1);

        $(".home-layouts__mini-block").removeClass("current");
        $(".home-layouts__mini-block").eq(index).addClass("current");
        $(".scroll-content").animate({ scrollTop: currentOffset }, 500);
      }

      //vertical block
      $(".scroll-content").on(
        "click",
        ".home-layouts__mini-block",
        function () {
          if ($(this).hasClass("current")) {
            return false;
          }
          let indexEl = $(this).index();

          $(".home-layouts__slider").trigger("to.owl.carousel", indexEl);
        },
      );

      //tabs
      $(".home-layouts__tab").each(function (i, item) {
        let indeEl = $(item).attr("data-tab");
        if (layoutsObj[indeEl] == undefined) {
          $(this).remove();
        }
      });

      $(".home-layouts__tab").on("click", function () {
        if ($(this).hasClass("current")) {
          return false;
        }
        let indexEl = $(this).attr("data-tab");
        $(".home-layouts__tab").removeClass("current");
        $(this).addClass("current");

        //delete all data
        for (var i = 1; i <= sliderItems; i++) {
          // delete all slide
          $(".home-layouts__slider").trigger("remove.owl.carousel", 0);
        }
        $(".scroll-content").html("");
        $(".home-layouts__texts").html("");

        $.each(layoutsObj[indexEl], function (i, item) {
          //vertical block
          $(".scroll-content").append(`
        <div class="home-layouts__mini-block">
          <div class="flex">
              <div class="home-layouts__mini-block-text rooms">${
                item["rooms"]
              }К</div>
              <div class="home-layouts__mini-block-text square">${
                item["sqrtLive"]
              } м2</div>
          </div>
          <div class="home-layouts__mini-block-img" style="background-image: url('${
            item["img"][0]
          }');"></div>
          <div class="home-layouts__mini-block-text cost">${
            item["cost"] ? "от " + item["cost"] + " р" : ""
          }</div>
        </div>
      `);

          //slider
          $(".home-layouts__slider").trigger("add.owl.carousel", [
            `
        <div class="home-layouts__slide">
            <div class="home-layouts__slide-title">
                <h5>
                    ${item["title"]}
                </h5> 
            </div>
            <div class="home-layouts__slide-img">
                <img src="${item["img"][0]}" class="active" alt="">
                <img src="${item["img"][1]}" alt="">
                <img src="${item["img"][2]}" alt="">
            </div>
            
            <div class="home-layouts__slide-tabs">
                      <div class="home-layouts__slide-tab active" data-id="0">&Scy; &mcy;&iecy;&bcy;&iecy;&lcy;&softcy;&yucy;</div>
                      <div class="home-layouts__slide-tab" data-id="1">&Scy; &rcy;&acy;&zcy;&mcy;&iecy;&rcy;&acy;&mcy;&icy;</div>
                      <div class="home-layouts__slide-tab" data-id="2">3D &vcy;&icy;&dcy;&ycy;</div>
            </div>
            
            
            
            
        </div>
      `,
          ]);

          $(".home-layouts__slide-tab").off();
          $(".home-layouts__slide-tab").on("click", (e) => {
            const button = $(e.target);
            const id = Number(button.attr("data-id"));
            const wrapper = button.parents(".home-layouts__slide");
            const images = wrapper.find(".home-layouts__slide-img img");
            wrapper.find(".home-layouts__slide-tab").removeClass("active");
            button.addClass("active");
            images.removeClass("active");
            images.eq(id).addClass("active");
          });

          //text
          let titleLayout = indexEl != 0 ? `${indexEl}-комнатная` : "Студия";
          let costLayout =
            item["cost"] != 0 && item["cost"] != null
              ? `<div class="home-layouts__cost">от ${Number(
                  item["cost"],
                ).toLocaleString()} ₽</div>`
              : "<br>";

          $(".home-layouts__texts").append(`
                    <div class="home-layouts__text">
                      <div class="home-layouts__param">
                        <h5>${item["rooms"]}</h5>
                        <span class="subtitle">${
                          item["rooms"] == 1
                            ? "Комната"
                            : item["rooms"] == 5
                              ? "Комнат"
                              : "Комнаты"
                        }</span>
                      </div>
                      <div class="home-layouts__param">
                        <h5>${item["sqrtLive"]} м²</h5>
                        <span class="subtitle">Площадь</span>
                      </div>
                      <div class="home-layouts__param">
                        <h5>${
                          item["cost"] ? "от " + item["cost"] + " р" : ""
                        }</h5>
                        <span class="subtitle">${item["dopCostInfo"]}</span>
                      </div>
                     <a class="filled link link-plans uppercase" href="#" id="${
                       item["title"]
                     }" data-id="choose-apartments" data-button="modal-form">
                        Выбрать квартиру
                     </a>
                    </div>
                `);
        });
        $(".link-plans").off();
        $(".link-plans").click((e) => {
          e.preventDefault();
          const modal = $("[data-name = 'modal-form']");
          const modalTitle = modal.find(".js-form-title");
          const data = $(e.target).attr("id");
          const form = modal.find("form");

          form.attr("data-dopinfo", data);
          modal.addClass("active");
          modalTitle.text("Заявка на бронирование");
          $("body").addClass("active-modal");
          $(".js-modal-reset").addClass("active");
          form.find(".js-message").hide();
          form.find("label, .form__footer").each((idx, i) => {
            $(i).attr("style", "block");
            const valueHolder = $(i).find("input, textarea");
            valueHolder.val("");
          });
        });
        // refresh state
        $(".home-layouts__mini-block").eq(0).addClass("current");
        $(".home-layouts__slider").trigger("refresh.owl.carousel");
        $(".home-layouts__text").eq(0).addClass("current");
      });

      $(".home-layouts__tab").eq(0).trigger("click");
      slider.trigger("refresh.owl.carousel");
    });
  }
}
