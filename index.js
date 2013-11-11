/*jslint browser: true, devel: true, unparam: true, sloppy: true, white: true */
/*global jQuery, $ */

var $ausgabe;
function ausgeben( in_text,domID, width,height ) {
  $ausgabe.text( in_text );
};

function Dat() {
  var self = this;

  
  self.init = function(graphPaper, offsetX) {
    //self.graphPaper = Raphael( 'utput', 900, 120 );
    self.graphPaper = graphPaper;
    self.offsetX = offsetX;
    
    //Hier war früher die humanPath
    
    self.objekte = [];
  };
  
  self.speichereObjekteAusCSVString = function( in_csv_string ) {
    console.log( "-> verarbeite CSV Datei..." );
    
    var alleTextZeilen = in_csv_string.split( /\r\n|\n/ ),
        schluesselNamen = alleTextZeilen[ 0 ].split( ';' ),
        i, j, werte, objekt;
    
    for ( i = 1; i < alleTextZeilen.length; i += 1 ) {
      werte = alleTextZeilen[ i ].split( ';' );
      
      if ( werte.length < schluesselNamen.length ) {
        console.log( "   - zu wenig Werte in Zeile " + i );
        
      } else {
        objekt = {};
        for ( j = 0; j < schluesselNamen.length; j += 1 ) {
          objekt[ schluesselNamen[ j ] ] = werte[ j ];
        }
        self.objekte.push( objekt );
        
        if ( werte.lenght > schluesselNamen.length ) {
          console.log( "   - zu viele Werte in Zeile " + i );
        }
      }
    }
    console.log( "<- CSV Datei in " + self.objekte.length + " Objekte gewandelt" );
  };
  
  self.neuerSatz = function( in_text ) {
    $neue_zeile = $( in_text );
    $( '#erklaerung p:last-child' ).append( $neue_zeile );
  };
  
  self.gruppiere = function( in_array, in_schluessel ) {
    var gruppen = [],
        werte = [],
        element, wertFuerSchluessel, gruppe;
        
    for ( var i = 0; i < in_array.length; i += 1 ) {
      element = in_array[ i ];
      wertFuerSchluessel = element[ in_schluessel ];
      
      if ( werte.indexOf( wertFuerSchluessel ) < 0 ) {
        werte.push( wertFuerSchluessel );
        gruppen.push( [] );
      }
      
      gruppe = gruppen[ werte.indexOf( wertFuerSchluessel ) ];
      gruppe.push( element );
    }
    return gruppen;
  };
  
  self.objekteFilternKreise = function( in_jahr ) {
    ausgeben( 'Objekte filtern' );
    $( '#erklaerung' ).append( '<p></p>' );
    
    // nur Objekte für 2012
    self.aktuelleObjekte = self.objekte.filter( function( e ) {
      return ( e[ "Ereignisjahr" ] == in_jahr );
    });
    self.neuerSatz( '<span> Für das Jahr ' + in_jahr + ' sind ' +
      self.aktuelleObjekte.length +
      ' Datenobjekte vorhanden.</span>' );

   /* // daraus nur Objekte für Land
    self.landZuzugsortNameObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Land Zuzugsort (Name)" ] == "Schweiz" );
    });
    self.neuerSatz( '<span>  ' + in_jahr + ' ' +'sind '+ ' ' + 
      self.landZuzugsortNameObjekte.length +
      ' a);
    */
    //daraus nur Objekte für Kantone
     // daraus nur Objekte für Rathaus
    self.kantoneZuzugsortObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Kanton Zuzugsort (Name)" ] == "Bern" );
    });
    self.neuerSatz( '<span>  Aus "Bern" kamen' + ' ' + in_jahr + ' ' +'genau '+ ' ' + 
      self.kantoneZuzugsortObjekte.length +
      '.</span>' );

    // daraus gruppiere nach Kontinent
    self.kontinentGruppen = self.gruppiere( self.aktuelleObjekte, "Wohnort_Kreis" );
    self.kontinentNamen = self.kontinentGruppen.map( function( e ) {
      return e[ 0 ][ "Wohnort_Kreis" ];
    } );
    self.neuerSatz( '<span> Daraus ergeben sich Einwohner für folgende ' +
      self.kontinentGruppen.length +
      ' Kontinente: ' +
      self.kontinentNamen.join( ", " ) +
      '.</span>' );
    
    // daraus summiere die Anzahl der Personen (je Kontinent Subarray)
    self.kontinentAnzahlen = self.kontinentGruppen.map( function( e ) {
      return ( e.reduce( function( sum, e ) {
        return ( sum + parseInt( e[ "wirtschaftliche Zuz�ge" ] ) );
      }, 0 ) );
    } );
    self.neuerSatz( '<span> Dort wohnen jeweils folgende Anzahlen an Personen: ' +
      self.kontinentAnzahlen.join( ", ") + 
      '.</span>' );
  };

  self.objekteFilternGender = function( in_jahr ) {

    ausgeben( 'Objekte filtern' );
    $( '#erklaerung' ).append( '<p></p>' );
    
    // nur Objekte für 2012
    self.aktuelleObjekte = self.objekte.filter( function( e ) {
      return ( e[ "Ereignisjahr" ] == in_jahr );
    });
    self.neuerSatz( '<span> Für das Jahr ' + in_jahr + ' sind ' +
      self.aktuelleObjekte.length +
      ' Datenobjekte vorhanden.</span>' );


    /*
    // daraus nur Objekte für Land
    self.landZuzugsortNameObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Land Zuzugsort (Name)" ] == "Schweiz" );
    });
    self.neuerSatz( '<span>  ' + in_jahr + ' ' +'sind '+ ' ' + 
      self.landZuzugsortNameObjekte.length +
      ' aus der "Schweiz" hergezogen.</span>' );
    */
    //daraus nur Objekte für Kantone
     // daraus nur Objekte für Rathaus
    self.kantoneZuzugsortObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Kanton Zuzugsort (Name)" ] == "Bern" );
    });
    self.neuerSatz( '<span>  Aus "Bern" kamen' + ' ' + in_jahr + ' ' +'genau '+ ' ' + 
      self.kantoneZuzugsortObjekte.length +
      '.</span>' );


    
    // daraus gruppiere nach Kontinent
    self.kontinentGruppen = self.gruppiere( self.aktuelleObjekte, "Geschlecht (Code)" );
    self.kontinentNamen = self.kontinentGruppen.map( function( e ) {
      return e[ 0 ][ "Geschlecht (Code)" ];
    } );
    self.neuerSatz( '<span> Daraus ergeben sich Einwohner für folgende ' +
      self.kontinentGruppen.length +
      ' Kontinente: ' +
      self.kontinentNamen.join( ", " ) +
      '.</span>' );
    
    // daraus summiere die Anzahl der Personen (je Kontinent Subarray)
    self.kontinentAnzahlen1 = self.kontinentGruppen.map( function( e ) {
      return ( e.reduce( function( sum, e ) {
        return ( sum + ( e[ "Geschlecht (Code)" ] ) );
      }, 0 ) );
    } );

    self.neueKontinentAnzahlen2 = [];

    for (var i = 0; i < self.kontinentAnzahlen1.length; i++) {
      self.neueKontinentAnzahlen2.push(self.kontinentAnzahlen1[i].length)
    };
    console.log(self.neueKontinentAnzahlen2);
   


    self.neuerSatz( '<span> Dort wohnen jeweils folgende Anzahlen an Personen: ' +
      self.neueKontinentAnzahlen2.join( ", ") + 
      '.</span>' );
  };

  self.objekteFilternAge = function( in_jahr ) {

    ausgeben( 'Objekte filtern' );
    $( '#erklaerung' ).append( '<p></p>' );
    
    // nur Objekte für 2012
    self.aktuelleObjekte = self.objekte.filter( function( e ) {
      return ( e[ "Ereignisjahr" ] == in_jahr );
    });
    self.neuerSatz( '<span> Für das Jahr ' + in_jahr + ' sind ' +
      self.aktuelleObjekte.length +
      ' Datenobjekte vorhanden.</span>' );


    /*
    // daraus nur Objekte für Land
    self.landZuzugsortNameObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Land Zuzugsort (Name)" ] == "Schweiz" );
    });
    self.neuerSatz( '<span>  ' + in_jahr + ' ' +'sind '+ ' ' + 
      self.landZuzugsortNameObjekte.length +
      ' aus der "Schweiz" hergezogen.</span>' );
    */
    //daraus nur Objekte für Kantone
     // daraus nur Objekte für Rathaus
    self.kantoneZuzugsortObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Kanton Zuzugsort (Name)" ] == "Bern" );
    });
    self.neuerSatz( '<span>  Aus "Bern" kamen' + ' ' + in_jahr + ' ' +'genau '+ ' ' + 
      self.kantoneZuzugsortObjekte.length +
      '.</span>' );


    
    // daraus gruppiere nach Kontinent
    self.kontinentGruppen = self.gruppiere( self.aktuelleObjekte, "10-Jahres-Altersgruppe (Sort)" );
    self.kontinentNamen = self.kontinentGruppen.map( function( e ) {
      return e[ 0 ][ "10-Jahres-Altersgruppe (Sort)" ];
    } );
    self.neuerSatz( '<span> Daraus ergeben sich Einwohner für folgende ' +
      self.kontinentGruppen.length +
      ' Kontinente: ' +
      self.kontinentNamen.join( ", " ) +
      '.</span>' );
    
    // daraus summiere die Anzahl der Personen (je Kontinent Subarray)
    self.kontinentAnzahlen3 = self.kontinentGruppen.map( function( e ) {
      return ( e.reduce( function( sum, e ) {
        return ( sum + parseInt( e[ "10-Jahres-Altersgruppe (Sort)" ] ) );
      }, 0 ) );
    } );

    //self.neueKontinentAnzahlen5 = [];
    console.log("wurden die Werte für Age erstellt" + self.kontinentAnzahlen3);

    self.neuerSatz( '<span> Dort wohnen jeweils folgende Anzahlen an Personen: ' +
      self.kontinentAnzahlen3.join( ", ") + 
      '.</span>' );
  };
  
  self.objekteFilternKanton = function( in_jahr ) {
    ausgeben( 'Objekte filtern' );
    $( '#erklaerung' ).append( '<p></p>' );
    
    // nur Objekte für 2012
    self.aktuelleObjekte = self.objekte.filter( function( e ) {
      return ( e[ "Ereignisjahr" ] == in_jahr );
    });
    self.neuerSatz( '<span> Für das Jahr ' + in_jahr + ' sind ' +
      self.aktuelleObjekte.length +
      ' Datenobjekte vorhanden.</span>' );
    




    // daraus nur Objekte für Land
    self.landZuzugsortNameObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Land Zuzugsort (Name)" ] == "Schweiz" );
    });
    self.neuerSatz( '<span>  ' + in_jahr + ' ' +'sind '+ ' ' + 
      self.landZuzugsortNameObjekte.length +
      ' aus der "Schweiz" hergezogen.</span>' );

    //daraus nur Objekte für Kantone
     // daraus nur Objekte für Rathaus
    self.kantoneZuzugsortObjekte = self.aktuelleObjekte.filter( function( e ) {
      return ( e[ "Kanton Zuzugsort (Name)" ] == "Bern" );
    });
    self.neuerSatz( '<span>  Aus "Bern" kamen' + ' ' + in_jahr + ' ' +'genau '+ ' ' + 
      self.kantoneZuzugsortObjekte.length +
      '.</span>' );


    
    // daraus gruppiere nach Kontinent
    self.kontinentGruppen = self.gruppiere( self.landZuzugsortNameObjekte, "Kanton Zuzugsort (Name)" );
    self.kontinentNamen = self.kontinentGruppen.map( function( e ) {
      return e[ 0 ][ "Kanton Zuzugsort (Name)" ];
    } );
    self.neuerSatz( '<span> Daraus ergeben sich Einwohner für folgende ' +
      self.kontinentGruppen.length +
      ' Kontinente: ' +
      self.kontinentNamen.join( ", " ) +
      '.</span>' );
    
    // daraus summiere die Anzahl der Personen (je Kontinent Subarray)
    self.kontinentAnzahle6 = self.kontinentGruppen.map( function( e ) {
      return ( e.reduce( function( sum, e ) {
        return ( sum + parseInt( e[ "wirtschaftliche Zuz�ge" ] ) );
      }, 0 ) );
    } );
    self.neuerSatz( '<span> Dort wohnen jeweils folgende Anzahlen an Personen: ' +
      self.kontinentAnzahle6.join( ", ") + 
      '.</span>' );
  };


  self.zeichneGraphKreis = function() {
    self.graphPaper.clear();
    
    console.log(self.kontinentAnzahlen);

    // variablen fürs rechnen
    self.zahlFuerBruch = 0;
    self.zahltFuerMultipliukation = 98;

    //den array zusammen addieren und als divider generieren
    self.kontinentAnzahlen.forEach( function(e,i){
      self.zahlFuerBruch += e;
    });
    console.log("werte für bruch" + " " + self.zahlFuerBruch);

    //die werte des arrays durch die gesamtzahl der array summe teilen
    self.geteilteWerte = self.kontinentAnzahlen.map(function(e, i) { 
    return e / self.zahlFuerBruch;
    });
    console.log(self.geteilteWerte );

    //die array werte mal die gesamtanzahl der humanicons rechnen
    self.multiplizierteWerte = self.geteilteWerte.map(function(e,i){
      return e * self.zahltFuerMultipliukation;
    });
    console.log("Array der multiplizierten Werte" + " " + self.multiplizierteWerte);

    //die summer aus dem array muss 98 ergeben
    /*self.ZaehlerFuerArray = 0;
    self.multiplizierteWerte.forEach( function(e,i){
      self.ZaehlerFuerArray += e;
    });
    console.log(self.ZaehlerFuerArray);*/

    
    //jeder wert des arrays aufrechnen
    self.voriges_ergebnis = 0;
    self.ergebnisseAddierterArray = self.multiplizierteWerte.map( function( e, i){
      self.ergebnis = self.voriges_ergebnis + e;
      self.voriges_ergebnis = self.ergebnis;
      return self.ergebnis;
    });
    console.log("Array der addierten Werte" + " " + self.ergebnisseAddierterArray );


    // die array werte runden
    self.gerundeterArray = self.ergebnisseAddierterArray.map( function( e,i){
      return e = parseInt(e);
    });
    console.log("gerundete Werte" + " " + self.gerundeterArray);

    
    self.counter = 0;
    console.log("counter " + "  " + self.counter);
    

    
   // var calcGesamtIcons = zuZeichnendeElemente[i] / zahlFuerBruch;
   // console.log("geteilte einzelobjekte" + " " + calcGesamtIcons);

 
    // zeichne die HumanIcons
    for(i=0; i<7; i++){
      for(j=0; j< 14; j++){

        self.kleinste = self.gerundeterArray.reduce( function( merge, e){
          if(merge < self.counter){
            return e;
          } else {
            return merge;
          }
        }, -1); 


        console.log("wie siehts mit den kleinsten werten aus?" + " " + self.kleinste);

        self.neuerIndex = self.gerundeterArray.indexOf(self.kleinste);
        console.log("gits wärte" + " " + self.neuerIndex);
        
        var human = self.graphPaper.path(humanPath[self.neuerIndex]);
        human.translate(j*42, i*65);
        human.translate(-30,-106);

        human.scale(0.17); 

        human.attr(humanStyle[self.neuerIndex]);
        
        /*if(self.neuerIndex == 0){
          human.attr({
          'fill':   '#000000'
          });
        } else {
          human.attr({
          'fill':   '#eeeeee'
          });
        };
        */


        console.log("styling" + " " + humanStyle[self.neuerIndex]);
        self.counter += 1;
        console.log("counter in der for Schleife" + "  " + self.counter);
      };
    };
  };
  self.zeichneGraphGender = function() {
    self.graphPaper.clear();
    
    console.log("Wert von neueKontinentAnzahlen2" + " " + self.neueKontinentAnzahlen2);

    // variablen fürs rechnen
    self.zahlFuerBruch = 0;
    self.zahltFuerMultipliukation = 98;

    //den array zusammen addieren und als divider generieren
    self.neueKontinentAnzahlen2.forEach( function(e,i){
      self.zahlFuerBruch += e;
    });
    console.log("werte für bruch" + " " + self.zahlFuerBruch);

    //die werte des arrays durch die gesamtzahl der array summe teilen
    self.geteilteWerte = self.neueKontinentAnzahlen2.map(function(e, i) { 
    return e / self.zahlFuerBruch;
    });
    console.log(self.geteilteWerte );

    //die array werte mal die gesamtanzahl der humanicons rechnen
    self.multiplizierteWerte = self.geteilteWerte.map(function(e,i){
      return e * self.zahltFuerMultipliukation;
    });
    console.log("Array der multiplizierten Werte" + " " + self.multiplizierteWerte);

    //die summer aus dem array muss 98 ergeben
    /*self.ZaehlerFuerArray = 0;
    self.multiplizierteWerte.forEach( function(e,i){
      self.ZaehlerFuerArray += e;
    });
    console.log(self.ZaehlerFuerArray);*/

    
    //jeder wert des arrays aufrechnen
    self.voriges_ergebnis = 0;
    self.ergebnisseAddierterArray = self.multiplizierteWerte.map( function( e, i){
      self.ergebnis = self.voriges_ergebnis + e;
      self.voriges_ergebnis = self.ergebnis;
      return self.ergebnis;
    });
    console.log("Array der addierten Werte" + " " + self.ergebnisseAddierterArray );


    // die array werte runden
    self.gerundeterArray = self.ergebnisseAddierterArray.map( function( e,i){
      return e = parseInt(e);
    });
    console.log("gerundete Werte" + " " + self.gerundeterArray);

    
    self.counter = 0;
    console.log("counter " + "  " + self.counter);
    

    
   // var calcGesamtIcons = zuZeichnendeElemente[i] / zahlFuerBruch;
   // console.log("geteilte einzelobjekte" + " " + calcGesamtIcons);

 
    // zeichne die HumanIcons
    for(i=0; i<7; i++){
      for(j=0; j< 14; j++){

        self.kleinste = self.gerundeterArray.reduce( function( merge, e){
          if(merge < self.counter){
            return e;
          } else {
            return merge;
          }
        }, -1); 


        console.log("wie siehts mit den kleinsten werten aus?" + " " + self.kleinste);

        self.neuerIndex = self.gerundeterArray.indexOf(self.kleinste);
        console.log("gits wärte" + " " + self.neuerIndex);
        
        var human = self.graphPaper.path(genderPath[self.neuerIndex]);
        human.translate(j*42, i*65);
        human.translate(-35,-105);

        human.scale(0.16); 

        human.attr(genderStyle[self.neuerIndex]);
        
        /*if(self.neuerIndex == 0){
          human.attr({
          'fill':   '#000000'
          });
        } else {
          human.attr({
          'fill':   '#eeeeee'
          });
        };
        */


        console.log("styling" + " " + genderStyle[self.neuerIndex]);
        self.counter += 1;
        console.log("counter in der for Schleife" + "  " + self.counter);
      };
    };
  };
  

  self.zeichneGraphAge = function() {
    self.graphPaper.clear();
    
    console.log("Wert von kontinentAnzahlen3" + " " + self.kontinentAnzahlen3);

    // variablen fürs rechnen
    self.zahlFuerBruch = 0;
    self.zahltFuerMultipliukation = 98;

    //den array zusammen addieren und als divider generieren
    self.kontinentAnzahlen3.forEach( function(e,i){
      self.zahlFuerBruch += e;
    });
    console.log("werte für bruch" + " " + self.zahlFuerBruch);

    //die werte des arrays durch die gesamtzahl der array summe teilen
    self.geteilteWerte = self.kontinentAnzahlen3.map(function(e, i) { 
    return e / self.zahlFuerBruch;
    });
    console.log(self.geteilteWerte );

    //die array werte mal die gesamtanzahl der humanicons rechnen
    self.multiplizierteWerte = self.geteilteWerte.map(function(e,i){
      return e * self.zahltFuerMultipliukation;
    });
    console.log("Array der multiplizierten Werte" + " " + self.multiplizierteWerte);

    //die summer aus dem array muss 98 ergeben
    /*self.ZaehlerFuerArray = 0;
    self.multiplizierteWerte.forEach( function(e,i){
      self.ZaehlerFuerArray += e;
    });
    console.log(self.ZaehlerFuerArray);*/

    
    //jeder wert des arrays aufrechnen
    self.voriges_ergebnis = 0;
    self.ergebnisseAddierterArray = self.multiplizierteWerte.map( function( e, i){
      self.ergebnis = self.voriges_ergebnis + e;
      self.voriges_ergebnis = self.ergebnis;
      return self.ergebnis;
    });
    console.log("Array der addierten Werte" + " " + self.ergebnisseAddierterArray );


    // die array werte runden
    self.gerundeterArray = self.ergebnisseAddierterArray.map( function( e,i){
      return e = parseInt(e);
    });
    console.log("gerundete Werte" + " " + self.gerundeterArray);

    
    self.counter = 0;
    console.log("counter " + "  " + self.counter);
    

    
   // var calcGesamtIcons = zuZeichnendeElemente[i] / zahlFuerBruch;
   // console.log("geteilte einzelobjekte" + " " + calcGesamtIcons);

 
    // zeichne die HumanIcons
    for(i=0; i<7; i++){
      for(j=0; j< 14; j++){

        self.kleinste = self.gerundeterArray.reduce( function( merge, e){
          if(merge < self.counter){
            return e;
          } else {
            return merge;
          }
        }, -1); 


        console.log("wie siehts mit den kleinsten werten aus?" + " " + self.kleinste);

        self.neuerIndex = self.gerundeterArray.indexOf(self.kleinste);
        console.log("gits wärte" + " " + self.neuerIndex);
        
        var human = self.graphPaper.path(agePath[self.neuerIndex]);
        human.translate(j*42, i*65);
        human.translate(-35,-106);

        human.scale(0.17); 

        human.attr(ageStyle[self.neuerIndex]);
        
        /*if(self.neuerIndex == 0){
          human.attr({
          'fill':   '#000000'
          });
        } else {
          human.attr({
          'fill':   '#eeeeee'
          });
        };
        */


        console.log("styling" + " " + genderStyle[self.neuerIndex]);
        self.counter += 1;
        console.log("counter in der for Schleife" + "  " + self.counter);
      };
    };
  };

  self.zeichneGraphKanton = function() {
    self.graphPaper.clear();
    
    console.log(self.kontinentAnzahle6);

    // variablen fürs rechnen
    self.zahlFuerBruch = 0;
    self.zahltFuerMultipliukation = 98;

    //den array zusammen addieren und als divider generieren
    self.kontinentAnzahle6.forEach( function(e,i){
      self.zahlFuerBruch += e;
    });
    console.log("werte für bruch" + " " + self.zahlFuerBruch);

    //die werte des arrays durch die gesamtzahl der array summe teilen
    self.geteilteWerte = self.kontinentAnzahle6.map(function(e, i) { 
    return e / self.zahlFuerBruch;
    });
    console.log(self.geteilteWerte );

    //die array werte mal die gesamtanzahl der humanicons rechnen
    self.multiplizierteWerte = self.geteilteWerte.map(function(e,i){
      return e * self.zahltFuerMultipliukation;
    });
    console.log("Array der multiplizierten Werte" + " " + self.multiplizierteWerte);

    //die summer aus dem array muss 98 ergeben
    /*self.ZaehlerFuerArray = 0;
    self.multiplizierteWerte.forEach( function(e,i){
      self.ZaehlerFuerArray += e;
    });
    console.log(self.ZaehlerFuerArray);*/

    
    //jeder wert des arrays aufrechnen
    self.voriges_ergebnis = 0;
    self.ergebnisseAddierterArray = self.multiplizierteWerte.map( function( e, i){
      self.ergebnis = self.voriges_ergebnis + e;
      self.voriges_ergebnis = self.ergebnis;
      return self.ergebnis;
    });
    console.log("Array der addierten Werte" + " " + self.ergebnisseAddierterArray );


    // die array werte runden
    self.gerundeterArray = self.ergebnisseAddierterArray.map( function( e,i){
      return e = parseInt(e);
    });
    console.log("gerundete Werte" + " " + self.gerundeterArray);

    
    self.counter = 0;
    console.log("counter " + "  " + self.counter);
    

 
    // zeichne die HumanIcons
    for(i=0; i<7; i++){
      for(j=0; j< 14; j++){

        self.kleinste = self.gerundeterArray.reduce( function( merge, e){
          if(merge < self.counter){
            return e;
          } else {
            return merge;
          }
        }, -1); 


        console.log("wie siehts mit den kleinsten werten aus?" + " " + self.kleinste);

        self.neuerIndex = self.gerundeterArray.indexOf(self.kleinste);
        console.log("gits wärte" + " " + self.neuerIndex);
        
        var human = self.graphPaper.path(kantonPath[self.neuerIndex]);
        human.translate(j*42, i*65);
        human.translate(-35, -110);

        human.scale(0.17); 

        human.attr(kantonStyle[self.neuerIndex]);
        


        console.log("styling" + " " + kantonStyle[self.neuerIndex]);
        console.log("path stuff" + " " + kantonPath[self.neuerIndex]);
        self.counter += 1;
        console.log("counter in der for Schleife" + "  " + self.counter);
      };
    };
  };

  
  self.selektiere = function( in_jahr ) {
    
    if(self.nameButtonKreis == 1){
      self.objekteFilternKreise( in_jahr );
      self.zeichneGraphKreis();
      self.nameButtonGender = 0;
      self.nameButtonAge = 0;
      self.nameButtonKanton = 0;
      
    };
    if(self.nameButtonGender == 1){
      self.objekteFilternGender( in_jahr );
      self.zeichneGraphGender();
      self.nameButtonKreis = 0;
      self.nameButtonAge = 0;
      self.nameButtonKanton = 0;

    };
    if(self.nameButtonAge == 1){
      self.objekteFilternAge( in_jahr );
      self.zeichneGraphAge();
      self.nameButtonKreis = 0;
      self.nameButtonGender = 0;
      self.nameButtonKanton = 0;
    };
    if(self.nameButtonKanton == 1){
      self.objekteFilternKanton( in_jahr );
      self.zeichneGraphKanton();
      self.nameButtonKreis = 0;
      self.nameButtonGender = 0;
      self.nameButtonAge = 0;
    };


  };
  
  self.datenSindDa = function( in_daten ) {
    ausgeben( 'AJAX Abruf angekommen...' );
    var $erklaerung = $( '#erklaerung' ),
        $neue_zeile;
    
    self.speichereObjekteAusCSVString( in_daten );
    $neue_zeile = $( '<p>Dabei wurden ' +
      self.objekte.length +
      ' Datenobjekte angelegt.</p>' );
    $erklaerung.append( $neue_zeile );
    
    self.objekteFilternKreise( 2012 ); //hier einfach den parameter raus nehmen, dann sollten alle daten auf der timeline anwendbar sein
    self.objekteFilternGender( 2012 );
    self.objekteFilternAge( 2012 );
    self.objekteFilternKanton( 2012 );
    self.zeichneGraphKreis();
    self.zeichneGraphGender();
    self.zeichneGraphAge();
    self.zeichneGraphKanton();
    
    ausgeben( 'fertig!' );
  };
  
}


jQuery( function() {
  // Start des Programms
  $ausgabe = $( '#ausgabe' );
  ausgeben( 'Starten...' );
  var div_width = $ausgabe.width();
  ausgabe = new ausgeben('ausgeben', 1280, 550);

  window.mein_dat = new Dat();
  window.mein_dat_wegzug = new Dat();

  var graphPaper = Raphael('output', 600, 550);
  var graphPaper2 = Raphael('outputx', 600, 550);

  window.mein_dat.init(graphPaper, 0);
  window.mein_dat_wegzug.init(graphPaper2, 100);
  
  // Hole Datei mit den Daten in CSV Form
  ausgeben( 'CSV Datei laden und verarbeiten...' );
  // $.get( "../ZuzUege_Jahr2012.csv", mein_dat.datenSindDa );
  // $.get("../Wegzuege_seit2000clean2012.csv", mein_dat_wegzug.datenSindDa );
  $.get( "../Zuzuege_seit2000Ready.csv", mein_dat.datenSindDa );
  $.get("../Wegzuege_seit2000Ready.csv", mein_dat_wegzug.datenSindDa );
  
  createTypeButtons();
  createTimelineButtons();

  function createTypeButtons() {
    
    $( "#buttonKreis" ).click(function(){
      $()
      mein_dat.nameButtonKreis = 1;
      mein_dat_wegzug.nameButtonKreis = 1;
      console.log(mein_dat.nameButtonKreis);
      $("#buttonAge").removeClass("active");
      $("#buttonKanton").removeClass("active");
      $("#buttonGender").removeClass("active");
      $(this).addClass("active");
    })

    $( "#buttonGender" ).click(function(){
      $()
      mein_dat.nameButtonGender = 1;
      mein_dat_wegzug.nameButtonGender = 1;
      console.log(mein_dat.nameButtonGender);
      $("#buttonAge").removeClass("active");
      $("#buttonKanton").removeClass("active");
      $("#buttonKreis").removeClass("active");
      $(this).addClass("active");
    })

    $( "#buttonAge" ).click(function(){
      $()
      mein_dat.nameButtonAge = 1;
      mein_dat_wegzug.nameButtonAge = 1;
      console.log(mein_dat.nameButtonAge);
      $("#buttonGender").removeClass("active");
      $("#buttonKanton").removeClass("active");
      $("#buttonKreis").removeClass("active");
      $(this).addClass("active");
    })

    $( "#buttonKanton" ).click(function(){
      $()
      mein_dat.nameButtonKanton = 1;
      mein_dat_wegzug.nameButtonKanton = 1;
      console.log(mein_dat.nameButtonKanton);
      $("#buttonAge").removeClass("active");
      $("#buttonGender").removeClass("active");
      $("#buttonKreis").removeClass("active");
      $(this).addClass("active");
    })
    
    /*
    $( '#output' ).append( '<br/>' );
    var nameButton = 22;
      var $button_link = $( '<a href="javascript:window.mein_dat.selektiere;">' + nameButton + '</a>' );
      $( '#output' ).append( $button_link );
   */
  };

  window.selektiereJahr = function(jahr) {
    mein_dat.selektiere(jahr);
    mein_dat_wegzug.selektiere(jahr);
  };

  function createTimelineButtons() {


    $( '#input' ).append( '<br/>' );
    for ( var jahr = 2000; jahr < 2013; jahr += 1 ) {
      var $jahr_link = $('<a href="javascript:window.selektiereJahr('+jahr+')">' + jahr + '</a>');

      $( '#input' ).append( $jahr_link );
    } 
  };


  // Hier ist Ende der Initialisierungsphase des Programms.
  // Wir warten, bis der Callback "verarbeiteDaten" aufgerufen wird...
} );
