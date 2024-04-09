import { saveToLS } from "../localstorage/LSHandler";
import { drawFavPlaces } from "../utilities/drawFavPlaces";

export function mapsInit(lat, long) {
  let userMarks = localStorage.getItem("userMarks");
  let textAddresses = localStorage.getItem("locationText");
  //ужас, но ничего в голову не лезет
  let result;
  let result1;
  var tempPlaces;

  if (userMarks) {
    result = `[${userMarks}]`;
    result1 = JSON.parse(result);
  }

  if (textAddresses) {
    tempPlaces = JSON.parse(`[${textAddresses}]`);
    drawFavPlaces(tempPlaces);
  }

  ymaps.ready(function () {
    let myMap = new ymaps.Map(
        "map",
        {
          center: [lat, long],
          zoom: 17,
        },
        {
          searchControlProvider: "yandex#search",
        }
      ),
      // Создаём макет содержимого.
      // MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      //   '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      // ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: "Собственный значок метки",
          balloonContent: "Я здесь",
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: "../images/myIcon.png",
          // Размеры метки.
          iconImageSize: [60, 60],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-20, -20],
        }
      );

    if (result1) {
      result1.forEach((element) => {
        myMap.geoObjects.add(
          new ymaps.Placemark(
            [element.latitude, element.longtitude],
            {
              hintContent: "Собственный значок метки",
              balloonContent:
                "<div class='markContent'><h3>Собственное описание</h3><button class='mark-add-button'>сохранить метку</button><button class='mark-delete-button'>удалить метку</button></div>",
            },
            {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: "default#image",
              // Своё изображение иконки метки.
              iconImageHref: "../images/myMark.png",
              // Размеры метки.
              iconImageSize: [42, 42],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-20, -20],
            }
          )
        );
      });
    }

    myMap.geoObjects.add(myPlacemark);

    myMap.events.add("contextmenu", function (e) {
      const locationArray = e.get("coords");
      let lat = locationArray[0];
      let long = locationArray[1];
      let locationText = null;
      let reverseGeocoder = ymaps.geocode([lat, long]);

      reverseGeocoder.then(function (res) {
        locationText = res.geoObjects.get(0).properties.get("text");
        saveToLS("locationText", { locationText: locationText });
        let array = JSON.parse(`[${localStorage.getItem("locationText")}]`);
        console.log(array);
        drawFavPlaces(array);
      });

      saveToLS("userMarks", { latitude: lat, longtitude: long });

      myMap.geoObjects.add(
        new ymaps.Placemark(
          [lat, long],
          {
            hintContent: "Собственный значок метки",
            balloonContent: "Какая красивая метка",
          },
          {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: "default#image",
            // Своё изображение иконки метки.
            iconImageHref: "../images/myMark.png",
            // Размеры метки.
            iconImageSize: [42, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-20, -20],
          }
        )
      );
    });
  });
}
