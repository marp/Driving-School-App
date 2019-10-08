
         var db;
          var shortName = 'BazaFX';
          var version = '1.0';
          var displayName = 'BazaFX';
          var maxSize = 65535;
          
          // wywoływana kiedy pojawi się błąd w połączeniu do bazy:
          function errorHandler(transaction, error) {
             alert('Błąd: ' + error.message + ' kod błędu: ' + error.code);
          }
          
          // Funkcja wywoływana po udanej transakcji z bazą
          function successCallBack() {
             console.log("Debuger: sukces!");
          }
          
          function nullHandler(){}; 
          
          //Funkcja wywoływana po starcie apki
          $(document).ready(function() {
              if (!window.openDatabase) {
                 alert('Twoje urządzenie nie obsługuje SQLite!');
                 return;
              }
              db = openDatabase(shortName, version, displayName,maxSize); //tworzy połączenie z bazą
              db.transaction(function(tx){ //wykonuje SQL
              // tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
              //tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL)',[],nullHandler,errorHandler);},errorHandler,successCallBack);
              tx.executeSql( 'CREATE TABLE IF NOT EXISTS Status(Id INTEGER NOT NULL PRIMARY KEY, Name TEXT NOT NULL, State INT NOT NULL)',[],nullHandler,errorHandler);
              tx.executeSql( 'CREATE TABLE IF NOT EXISTS Track(Id INTEGER NOT NULL PRIMARY KEY, X INT NOT NULL, Y INT NOT NULL, Time TIMESTAMP NOT NULL)',[],nullHandler,errorHandler);
              tx.executeSql( 'CREATE TABLE IF NOT EXISTS Drive(Id INTEGER NOT NULL PRIMARY KEY, instructor_id INT,  km_start INT, km_stop INT)',[],nullHandler,errorHandler);


              },errorHandler,successCallBack);
              
          });
          
          function ListDBValues() {
           if (!window.openDatabase) {
            alert('To urządzenie nie obsługuje SQLite!');
            return;
           }
           $('#lbUsers').html(''); //wyczyszczenie wcześniejszej zawartości
           db.transaction(function(transaction) {
             transaction.executeSql('SELECT * FROM Status;', [],
               function(transaction, result) {
                if (result != null && result.rows != null) {
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    // $('#lbUsers').append('<br>' + row.UserId + '. ' +row.FirstName+ ' ' + row.LastName);
                    $('#lbUsers').append('<br>' + row.Id + '. ' +row.Name+ ' ' + row.State);
                  }
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }

          function ListDBValuesFromDrive() {
           $('#lbDrives').html(''); //wyczyszczenie wcześniejszej zawartości
           db.transaction(function(transaction) {
             transaction.executeSql('SELECT * FROM Drive;', [],
               function(transaction, result) {
                 console.log(result);
                if (result != null && result.rows != null) {
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    // $('#lbDrives').append('<br>' + row.Id + '. ' +row.instructor_id + '. '+row.client_id + '. '+row.km_start + '. '+row.km_stop + '. ');
                    $('#lbDrives').append('<tr><td class="numeric-cell">'+row.Id+'</td><td class="numeric-cell">'+row.instructor_id+'</td><td class="numeric-cell">'+row.km_start+'</td><td class="numeric-cell">'+row.km_stop+'</th></tr>');


                  }
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }

          
          function ListDBValuesFromStatus() {
           $('#lbStatus').html('');
           db.transaction(function(transaction) {
             transaction.executeSql('SELECT * FROM Status;', [],
               function(transaction, result) {
                 console.log(result);
                if (result != null && result.rows != null) {
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    // $('#lbDrives').append('<br>' + row.Id + '. ' +row.instructor_id + '. '+row.client_id + '. '+row.km_start + '. '+row.km_stop + '. ');
                    $('#lbStatus').append('<tr><td class="numeric-cell">'+row.Id+'</td><td class="label-cell">'+row.Name+'</td><td class="numeric-cell">'+row.State+'</td></tr>');
                  }
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }

          function ListDBValuesFromTrack() {
           $('#lbTrack').html('');
           db.transaction(function(transaction) {
             transaction.executeSql('SELECT * FROM Track;', [],
               function(transaction, result) {
                 console.log(result);
               
                if (result != null && result.rows != null) {
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    // $('#lbDrives').append('<br>' + row.Id + '. ' +row.instructor_id + '. '+row.client_id + '. '+row.km_start + '. '+row.km_stop + '. ');
                    $('#lbTrack').append('<tr><td class="numeric-cell">'+row.Id+'</td></td><td class="numeric-cell">'+row.X+'</td><td class="numeric-cell">'+row.Y+'</td><td class="numeric-cell">'+row.Time+'</td></tr>');
                  }
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }
          
          function AddValueToDB() {
           if (!window.openDatabase) {
             alert('To urządzenie nie obsługuje SQLite!');
             return;
           }
          
           db.transaction(function(transaction) {

            


             transaction.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',[$('#imie').val(), $('#nazwisko').val()],
               nullHandler,errorHandler);
             });
           ListDBValues();
           return false;
          }

          function NewDrive(instructor_id, km_start) {
           db.transaction(function(transaction) {
             transaction.executeSql('INSERT INTO Drive VALUES (null,?,?,0)',[instructor_id, km_start],
               nullHandler,errorHandler);
             });
             db.transaction(function(transaction) {
             transaction.executeSql('SELECT id as LastId FROM Drive ORDER BY id DESC LIMIT 1', [],
               function(transaction, result) {
               return result;
               },errorHandler);
           },errorHandler,nullHandler);
            
          }

          function AddCordToDB(x,y,timestamp) {
           db.transaction(function(transaction) {
             transaction.executeSql('INSERT INTO Track(X,Y,Time) VALUES (?,?,?)',[x,y,timestamp],
               nullHandler,errorHandler);
             });
           return false;
          }

          function AddStopKm(id,km_stop) {
           db.transaction(function(transaction) {
             transaction.executeSql('UPDATE Drive SET km_stop=? WHERE id=?',[km_stop, id],
               nullHandler,errorHandler);
             });
           return false;
          }
          
          //check if user is logged in and sqlite have logged_state
          function LoginCheck(){
            db.transaction(function(transaction) {
             transaction.executeSql('SELECT * FROM Status WHERE Name="logged_id" LIMIT 1', [],
               function(transaction, result) {
                if (result != null && result.rows != null) {
                  console.log("User logged in!");
                 }else{
                  console.log("No logged user in db.");
                 }
               },errorHandler);
           },errorHandler,nullHandler);
          }

          
          var return_val = -1;
          function GetLatestDriveID(){
           
            db.transaction(function(transaction) {
             transaction.executeSql('SELECT id FROM Drive ORDER BY id DESC LIMIT 1', [],
               function(transaction, result) {
                
                if (result != null) {
                
                 return_val = result.rows.item(0).Id;
                 }else{
                  console.log("error"+  result);
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }

                    
          localStorage.tracks = -1;
          function GetAllTracksForDriveID(id){
           
            db.transaction(function(transaction) {
             transaction.executeSql('SELECT X,Y,Time FROM Track', [],
               function(transaction, result) {
                if (result != null) {
                
                 return_val = result.rows;
                 }else{
                  console.log("error"+  result);
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }
          
          function GetTracks(){
            db.transaction(function(transaction) {
             transaction.executeSql('SELECT X,Y,Time FROM Track', [],
               function(transaction, result) {
                if (result != null && result.rows != null) {
                  localStorage.tracks = '[';
                  // localStorage.tracks = "{";
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    localStorage.tracks += "{";
                    localStorage.tracks += '"x":'+row.X+",";
                    localStorage.tracks += '"y":'+row.Y+",";
                    localStorage.tracks += '"timestamp":'+row.Time+"";
                    if((i+1) == result.rows.length){
                      localStorage.tracks += "}";
                    }else{
                      localStorage.tracks += "},";
                    }
                  }
                  localStorage.tracks += "]";
                  // console.log(localStorage.tracks);
                  // console.log(JSON.parse(localStorage.tracks));
                
                 }else{
                  console.log("error"+  result);
                 }
               },errorHandler);
           },errorHandler,nullHandler);
           return;
          }

          function LogOut(){
            db.transaction(function(transaction) {
             transaction.executeSql('DELETE FROM Status WHERE Name="logged_id"',[],
               nullHandler,errorHandler);
             });
              alert("logged out successfully");
          }
          
          function LogIn(id){
            db.transaction(function(transaction) {
             transaction.executeSql('INSERT INTO Status(Name, State) VALUES ("logged_id",?)',[id],
               nullHandler,errorHandler);
             });
          }

          function DeleteEverything(){
            db.transaction(function(transaction) {
             transaction.executeSql('DELETE FROM Status',[],
               nullHandler,errorHandler);
               transaction.executeSql('DELETE FROM Drive',[],
               nullHandler,errorHandler);
               transaction.executeSql('DELETE FROM Track',[],
               nullHandler,errorHandler);
             });
          }