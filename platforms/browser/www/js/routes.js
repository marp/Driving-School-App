routes = [
  {
    path: '/',
    url: './index.html',
     on: {
      pageInit: function (e, page) {
          function sukces(){
              console.log("GPS dziala");
          }
          function fail(){
              app.dialog.alert("Brak dostępu do GPS urządzenia. Sprawdź czy GPS jest włączony i aplikacja może z niego korzystać, lub spróbuj ponownie za chwilę.");
          }
          navigator.geolocation.getCurrentPosition(sukces,fail);


        $$('#logout_button').on('click', function () {
          localStorage.removeItem("instructor_id");
          app.views.main.router.navigate('/', {reloadCurrent: true});
        });

        if(localStorage.onDrive == 1){
            app.dialog.confirm('Ostatnia trasa nie została wysłana lub wystąpił błąd, czy chcesz ponownie wysłać tę trasę?', function () {
              // app.dialog.alert('Zostaniesz przeniesiony na stronę z wyznaczaniem czasu i wysyłaniem');
              app.views.main.router.navigate('/time/', { reloadCurrent: true });
          },
          function () {
            localStorage.clear();
            localStorage.stop = 1;
            DeleteEverything();
            app.views.main.router.navigate('/', {reloadCurrent: true});
          }
        );
        }

        if(localStorage.instructor_id==undefined){
          app.dialog.prompt('Wpisz swój numer identyfikacyjny.', function (instructor_id) {
            app.dialog.confirm('Czy twój numer identyfikacyjny to: ' + instructor_id + '?', function () {
              localStorage.instructor_id = instructor_id;
              document.getElementById("logged_as").innerHTML = instructor_id;
            });
          });
        }else{

            document.getElementById("logged_as").innerHTML = String(localStorage.instructor_id);



        }
          $$('#btn_start').on('click', function () {
          if(localStorage.instructor_id==undefined){
            app.dialog.prompt('Wpisz swój numer identyfikacyjny.', function (instructor_id) {
              app.dialog.confirm('Czy twój numer identyfikacyjny to: ' + instructor_id + '?', function () {
                localStorage.instructor_id = instructor_id;
                document.getElementById("logged_as").innerHTML = instructor_id;
              });
            });
          }else{

          var dialog = app.dialog.create({
            title: 'START',
            text: 'Czy chcesz rozpocząć jazdę? Jeśli tak wpisz przebieg samochodu poniżej',
            content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input class="dialog-input" type="number" placeholder="Podaj przebieg" required validate pattern="[0-9]*" data-error-message="Tylko cyfry!"></div></div>',
            buttons: [{text: 'OK'}],
            onClick: function (dialog, index) {

                km_start = dialog.$el.find('.dialog-input').val();
                if((!isNaN(km_start))&&(km_start !== "")){
                  app.dialog.confirm('Czy jesteś pewny, że przebieg samochodu to ' + km_start + '?', function () {
                    NewDrive(localStorage.instructor_id,0,km_start);
                    localStorage.km_start=km_start;
                    app.views.main.router.navigate('/clients/', { reloadCurrent: true });
                  });
                  }else{
                    app.dialog.alert("Wpisana wartość jest nieprawidłowa");
                  }
            },
            on: {
                open: function () {
                    // console.log("OPEN");
                }
            }
        }).open();
        }
          // app.dialog.prompt('Czy chcesz rozpocząć jazdę? Jeśli tak wpisz przebieg samochodu poniżej.', function (km_start) {
          // });
        });
      }
    }
  },
  {
    path: '/drive/',
    url: './pages/drive.html',
    on: {
      pageInit: function (e, page) {
        function someFunction() {
          var onSuccess = function (position) {

            $$('#x').html(position.coords.latitude);
            $$('#y').html(position.coords.longitude);
            $$('#altitude').html(position.coords.altitude);
            $$('#altitudeAccuracy').html(position.coords.accuracy);
            $$('#heading').html(position.coords.heading);
            $$('#speed').html(position.coords.speed);
            $$('#timestamp').html(position.timestamp);

            // result is "foobar", as provided by deferred.resolve() in somethingAsynchronous()
            //alert('after somethingAsynchronous(): ' + result);

            if(return_val == -1){
              GetLatestDriveID();
              setTimeout(function() {},2000);
            }else{
              if(localStorage.stop !== 1){
                AddCordToDB(return_val,position.coords.latitude,position.coords.longitude,position.timestamp);
                localStorage.onDrive = 1;
              }
            }


            };

          // onError Callback receives a PositionError object
          //
          function onError(error) {
            alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
          }

          navigator.geolocation.getCurrentPosition(onSuccess, onError);
          setTimeout(someFunction, 10000)
        }
        someFunction();

        //stopwatch
        var hours = 00;
        var mins = 00;
        var seconds = 00;
        var tens = 00;
        var appendTens = document.getElementById("tens");
        var appendSeconds = document.getElementById("seconds");
        var appendMins = document.getElementById("mins");
        var buttonStart = document.getElementById('stopwatch_start');
        var buttonStop = document.getElementById('stopwatch_pause');
        var buttonReset = document.getElementById('button-reset');
        var Interval;

        function start() {
          localStorage.stop = 0;

          clearInterval(Interval);
          Interval = setInterval(startTimer, 10);
        }

        function stop(){
          localStorage.stop = 1;
          clearInterval(Interval);
        }

        buttonStart.onclick = function () {
          start();
        }

        buttonStop.onclick = function () {
          clearInterval(Interval);
        }


        buttonReset.onclick = function () {
          clearInterval(Interval);
          tens = "00";
          seconds = "00";
          mins = "00";
          hours = "00";
          appendTens.innerHTML = tens;
          appendSeconds.innerHTML = seconds;
          appendMins.innerHTML = mins;
          appendHours.innerHTML = hours;
        }

        function startTimer() {
          tens++;

          if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
          }

          if (tens > 9) {
            appendTens.innerHTML = tens;

          }

          if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
          }

          if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
          }

          if (seconds > 59) {
            mins++;
            appendMins.innerHTML = "0" + mins;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
          }

          if (mins > 9) {
            appendMins.innerHTML = mins;
          }

          if (mins > 59) {
            hours++;
            appendHours.innerHTML = hours;
            mins = 0;
            appendMins.innerHTML = "0" + 0;
            alert("cyk godzika");
          }

        }
        start();

        //stop
        $$('#stop_button').on('click', function () {

          var dialog = app.dialog.create({
            title: 'STOP',
            text: 'Czy chesz zakończyć jazdę? Jeśli tak wpisz przebieg samochodu poniżej',
            content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input class="dialog-input" type="number" placeholder="Podaj przebieg" required validate pattern="[0-9]*" data-error-message="Tylko cyfry!"></div></div>',
            buttons: [{text: 'OK'}],
            onClick: function (dialog, index) {
                km_stop = dialog.$el.find('.dialog-input').val();

                if((!isNaN(km_stop))&&(km_stop !== "")){
                  app.dialog.confirm('Czy napewno chcesz zakończyć jazdę i jesteś pewny, że przebieg samochodu to ' + km_stop + '?', function () {

                    localStorage.km_stop=km_stop;

                    if(return_val == -1){
                      GetLatestDriveID();
                      setTimeout(function() {},3000);
                    }else{
                     AddStopKm(return_val,km_stop);
                     localStorage.km_stop=km_stop;
                     console.log(return_val+"xd"+km_stop);
                    }
                    stop();
                    localStorage.stop = true;


                    app.views.main.router.navigate('/time/', {reloadCurrent: true});
                  });
                  }else{
                    app.dialog.alert("Wpisana wartość jest nieprawidłowa");
                  }

            },
            on: {
                open: function () {
                    // console.log("OPEN");
                }
            }
        }).open();




            // app.dialog.prompt('Czy chesz zakończyć jazdę? Jeśli tak wpisz przebieg samochodu poniżej.', function (km_stop) {

            // });
        });
      },
    }
  },
  {
    path: '/time/',
    url: './pages/time_chooser.html',
    on: {
      pageInit: function (e, page) {


          document.getElementById("pesel_1_show").innerHTML = localStorage.pesel_1;
          document.getElementById("pesel_2_show").innerHTML = localStorage.pesel_2;
          document.getElementById("pesel_3_show").innerHTML = localStorage.pesel_3;
          document.getElementById("pesel_4_show").innerHTML = localStorage.pesel_4;

          localStorage.tracks = GetTracks();

          // document.getElementById("json_podglad").innerHTML = json;


        $$('#send_btn').on('click', function () {

          localStorage.pesel_1_time = (parseInt(document.getElementById("pesel_1_time_h").value)*60 + parseInt(document.getElementById("pesel_1_time_m").value));
          localStorage.pesel_2_time = (parseInt(document.getElementById("pesel_2_time_h").value)*60 + parseInt(document.getElementById("pesel_2_time_m").value));
          localStorage.pesel_3_time = (parseInt(document.getElementById("pesel_3_time_h").value)*60 + parseInt(document.getElementById("pesel_3_time_m").value));
          localStorage.pesel_4_time = (parseInt(document.getElementById("pesel_4_time_h").value)*60 + parseInt(document.getElementById("pesel_4_time_m").value));

          console.log(localStorage.tracks);
          console.log(localStorage.tracks_debug);
          // console.log( localStorage.tracks.rows.length);
          // localStorage.tracks.forEach(element => {
          //   element.time;
          // });


          var text =
            '{' +
            '"drive": {' +
            '"instructor_id": "'+ localStorage.instructor_id +'", '+
            '"km_start":'+localStorage.km_start+',' +
            '"km_stop": '+localStorage.km_stop+',' +
            '"clients": [' +
            '{' +
            '"id": '+localStorage.pesel_1+',' +
            '"time": '+localStorage.pesel_1_time+'' +
            '},' +
            '{' +
            '"id": '+localStorage.pesel_2+',' +
            '"time": '+localStorage.pesel_2_time+'' +
            '},' +
            '{' +
            '"id": '+localStorage.pesel_3+',' +
            '"time": '+localStorage.pesel_3_time+'' +
            '},' +
            '{' +
            '"id": '+localStorage.pesel_4+',' +
            '"time": '+localStorage.pesel_4_time+'' +
            '}' +
            '],' +
            '"tracks": '+localStorage.tracks ;
            console.log(localStorage.tracks);


            // for(var i=0;i<10; i++){
            //   text+='{' +
            //   '"x": "1.2345678901",' +
            //   '"y": "1.2345677653",' +
            //   '"timestamp": "213123123"' +
            //   '},';
            // }
            text +='' +
            '}' +
            '}';
          console.log(text);
          let json = JSON.parse(text);

          console.log(json);





          //here you have to enter URL to API
          var url = "";
          let data = json;
          console.log(data);

          // var data = { City: 'Moscow', Age: 25 };
          $.ajax({
            dataType: "json",
            url: url,
            type: "POST",
            //contentType: 'application/json; charset=utf-8',

            // data: JSON.stringify(data),
            data: data,
            success: function (re) {
              console.log(re);
              if(re==true){
                localStorage.clear();
                localStorage.stop = 1;
                DeleteEverything();
                app.views.main.router.navigate('/', {reloadCurrent: true});
              }else{
                app.dialog.alert('Niestety nie udało się wysłać danych na serwer, spróbuj jeszcze raz.');
              }
            },
            error: function (er, status) {
              console.log("error" + JSON.stringify(er) + status);
              app.dialog.alert('Niestety nie udało się wysłać danych na serwer, spróbuj jeszcze raz.');
            }
          });

        });




      }

    }



  },
  {
    path: '/clients/',
    url: './pages/clients_chooser.html',
    on: {
      pageInit: function (e, page) {

        $$('#clients_choosed').on('click', function () {

        if(!isNaN(parseInt(document.getElementById("pesel_1").value))){
          localStorage.pesel_1 = document.getElementById("pesel_1").value;
        }else{
          localStorage.pesel_1 = 0;
        }
        if(!isNaN(parseInt(document.getElementById("pesel_2").value))){
          localStorage.pesel_2 = document.getElementById("pesel_2").value;
        }else{
          localStorage.pesel_2 = 0;
        }
        if(!isNaN(parseInt(document.getElementById("pesel_3").value))){
          localStorage.pesel_3 = document.getElementById("pesel_3").value;
        }else{
          localStorage.pesel_3 = 0;
        }
        if(!isNaN(parseInt(document.getElementById("pesel_4").value))){
          localStorage.pesel_4 = document.getElementById("pesel_4").value;
        }else{
          localStorage.pesel_4 = 0;
        }

            app.views.main.router.navigate('/drive/', {reloadCurrent: true});
        });

      }
    }



  },
  {
    path: '/debug/',
    url: './pages/debug.html',
    on: {
      pageInit: function (e, page) {
        $$('#latest_id_check_debug').on('click', function () {
          app.dialog.alert('Ostatnie ID: '+GetLatestDriveID());
          console.log(typeof(GetLatestDriveID()));
          var a = GetLatestDriveID()
          console.log("global:"+return_val);
        });

        $$('#get_tracks_debug').on('click', function () {
          GetTracks();
        });


        $$('#json_btn').on('click', function () {
        //stary jsonik
          var url = "http://localhost/tests/odbierajka_jsonow/index.php";
          var data = {
            'clients': [
              {'id': 123123, 'time': 0},
              {'id': 123, 'time': 0},
              {'id': 123123, 'time': 0},
              {'id': 123, 'time': 0}
            ],
            'instructor_id': 123123};
            console.log(data);

           // var data = { City: 'Moscow', Age: 25 };
          $.ajax({
            dataType: "json",
            url: url,
            type: "POST",
            //contentType: 'application/json; charset=utf-8',

            // data: JSON.stringify(data),
            data: data,
            success: function(re){
              console.log(re);
            },
            error: function(er, status){
              console.log("error"+JSON.stringify(er)+status);
            }

          });


        });




      }
    },
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
