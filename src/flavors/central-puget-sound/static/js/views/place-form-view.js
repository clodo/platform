// BEGIN FLAVOR-SPECIFIC CODE
let PlaceFormView = require("../../../../../base/static/js/views/place-form-view.js");
let Util = require("../../../../../base/static/js/utils.js");
let Gatekeeper = require("../../../../../base/static/libs/gatekeeper.js");

const SCHOOL_DISTRICTS = {
  "Alcott-Elementary-School": "Lake Washington School District",
  "Audubon-Elementary-School": "Lake Washington School District",
  "Bell-Elementary-School": "Lake Washington School District",
  "Blackwell-Elementary-School": "Lake Washington School District",
  "Carson-Elementary-School": "Lake Washington School District",
  "Community-School": "Lake Washington School District",
  "Dickinson-Elementary-School": "Lake Washington School District",
  "Discovery-Elementary-School--Lake-WA": "Lake Washington School District",
  "Eastlake-High-School": "Lake Washington School District",
  "Einstein-Elementary-School": "Lake Washington School District",
  "Emerson-High-School": "Lake Washington School District",
  "Emerson-K-12": "Lake Washington School District",
  "Environmental-And-Adventure-School": "Lake Washington School District",
  "Evergreen-Middle-School": "Lake Washington School District",
  "Explorer-Community-School": "Lake Washington School District",
  "Finn-Hill-Middle-School": "Lake Washington School District",
  "Franklin-Elementary-School": "Lake Washington School District",
  "Frost-Elementary-School": "Lake Washington School District",
  "Futures-School": "Lake Washington School District",
  "Inglewood-Middle-School": "Lake Washington School District",
  "International-Community-School": "Lake Washington School District",
  "Juanita-Elementary-School": "Lake Washington School District",
  "Juanita-High-School": "Lake Washington School District",
  "Kamiakin-Middle-School": "Lake Washington School District",
  "Keller-Elementary-School": "Lake Washington School District",
  "Kirk-Elementary-School": "Lake Washington School District",
  "Kirkland-Middle-School": "Lake Washington School District",
  "Lake-Washington-High-School": "Lake Washington School District",
  "Lakeview-Elementary-School": "Lake Washington School District",
  "Mann-Elementary-School": "Lake Washington School District",
  "McAuliffe-Elementary-School": "Lake Washington School District",
  "Mead-Elementary-School": "Lake Washington School District",
  "Muir-Elementary-School": "Lake Washington School District",
  "Northstar-Middle-School": "Lake Washington School District",
  "Redmond-Elementary-School": "Lake Washington School District",
  "Redmond-Middle-School": "Lake Washington School District",
  "Redmond-High-School": "Lake Washington School District",
  "Renaissance-School-of-Art-And-Reasoning": "Lake Washington School District",
  "Rockwell-Elementary-School": "Lake Washington School District",
  "Rosa-Parks-Elementary-School": "Lake Washington School District",
  "Rose-Hill-Elementary-School": "Lake Washington School District",
  "Rush-Elementary-School": "Lake Washington School District",
  "Sandburg-Elementary-School": "Lake Washington School District",
  "Smith-Elementary-School": "Lake Washington School District",
  "Stella-Schola-Middle-School": "Lake Washington School District",
  "TESLA-STEM-High-School": "Lake Washington School District",
  "Thoreau-Elementary-School": "Lake Washington School District",
  "Twain-Elementary-School": "Lake Washington School District",
  "Wilder-Elementary-School": "Lake Washington School District",
  "Ardmore-Elementary-School": "Bellevue School District",
  "Bennett-Elementary-School": "Bellevue School District",
  "Cherry-Crest-Elementary-School": "Bellevue School District",
  "Clyde-Hill-Elementary-School": "Bellevue School District",
  "Eastgate-Elementary-School": "Bellevue School District",
  "Enatai-Elementary-School": "Bellevue School District",
  "Lake-Hills-Elementary-School": "Bellevue School District",
  "Medina-Elementary-School": "Bellevue School District",
  "Newport-Heights-Elementary-School": "Bellevue School District",
  "Phantom-Lake-Elementary-School": "Bellevue School District",
  "Sherwood-Forest-Elementary-School": "Bellevue School District",
  "Somerset-Elementary-School": "Bellevue School District",
  "Spiritridge-Elementary-School": "Bellevue School District",
  "Stevenson-Elementary-School": "Bellevue School District",
  "Wilburton-Elementary-School": "Bellevue School District",
  "Woodridge-Elementary-School": "Bellevue School District",
  "Chinook-Middle-School--Bellevue": "Bellevue School District",
  "Highland-Middle-School": "Bellevue School District",
  "Odle-Middle-School": "Bellevue School District",
  "Tillicum-Middle-School": "Bellevue School District",
  "Tyee-Middle-School-": "Bellevue School District",
  "Bellevue-High-School": "Bellevue School District",
  "Interlake-High-School": "Bellevue School District",
  "Newport-High-School": "Bellevue School District",
  "Sammamish-High-School": "Bellevue School District",
  "Bellevue-Big-Picture-School": "Bellevue School District",
  "International-School": "Bellevue School District",
  "Jing-Mei-Elementary-School": "Bellevue School District",
  "Puesta-Del-Sol-Elementary-School": "Bellevue School District",
  "Apollo-Elementary-School": "Issaquah School District",
  "Beaver-Lake-Middle-School": "Issaquah School District",
  "Briarwood-Elementary-School": "Issaquah School District",
  "Cascade-Ridge-Elementary-School": "Issaquah School District",
  "Challenger-Elementary-School": "Issaquah School District",
  "Clark-Elementary-School": "Issaquah School District",
  "Cougar-Ridge-Elementary-School": "Issaquah School District",
  "Creekside-Elementary-School": "Issaquah School District",
  "Discovery-Elementary-School--Issaquah": "Issaquah School District",
  "Endeavour-Elementary-School": "Issaquah School District",
  "Gibson-Ek-High-School": "Issaquah School District",
  "Grand-Ridge-Elementary-School": "Issaquah School District",
  "Issaquah-High-School": "Issaquah School District",
  "Issaquah-Middle-School": "Issaquah School District",
  "Issaquah-Valley-Elementary-School": "Issaquah School District",
  "Liberty-High-School": "Issaquah School District",
  "Maple-Hills-Elementary-School": "Issaquah School District",
  "Maywood-Middle-School": "Issaquah School District",
  "Newcastle-Elementary-School": "Issaquah School District",
  "Pacific-Cascade-Middle-School": "Issaquah School District",
  "Pine-Lake-Middle-School": "Issaquah School District",
  "Skyline-High-School": "Issaquah School District",
  "Sunny-Hills-Elementary-School": "Issaquah School District",
  "Sunset-Elementary-School": "Issaquah School District",
  "Carriage-Crest-Elementary-School": "Kent School District",
  "Cedar-Heights-Middle-School": "Kent School District",
  "Cedar-Valley-Elementary-School": "Kent School District",
  "Covington-Elementary-School": "Kent School District",
  "Crestwood-Elementary-School": "Kent School District",
  "East-Hill-Elementary-School": "Kent School District",
  "Emerald-Park-Elementary-School": "Kent School District",
  "Fairwood-Elementary-School": "Kent School District",
  "George-T-Daniel-Elementary-School": "Kent School District",
  "Glenridge-Elementary-School": "Kent School District",
  "Grass-Lake-Elementary-School": "Kent School District",
  "Horizon-Elementary-School": "Kent School District",
  "iGrad": "Kent School District",
  "Jenkins-Creek-Elementary-School": "Kent School District",
  "Kent-Elementary-School": "Kent School District",
  "Kent-Mountain-View-Academy": "Kent School District",
  "Kent-Phoenix-Academy": "Kent School District",
  "Kent-Valley-Early-Learning-Center": "Kent School District",
  "Kentlake-High-School": "Kent School District",
  "Kent-Meridian-High-School": "Kent School District",
  "Kentridge-High-School": "Kent School District",
  "Kentwood-High-School": "Kent School District",
  "Lake-Youngs-Elementary-School": "Kent School District",
  "Martin-Sortun-Elementary-School": "Kent School District",
  "Mattson-Middle-School": "Kent School District",
  "Meadow-Ridge-Elementary-School": "Kent School District",
  "Meeker-Middle-School": "Kent School District",
  "Meridian-Elementary-School": "Kent School District",
  "Meridian-Middle-School": "Kent School District",
  "Mill-Creek-Middle-School": "Kent School District",
  "Millennium-Elementary-School": "Kent School District",
  "Neely-OBrien-Elementary-School": "Kent School District",
  "Northwood-Middle-School": "Kent School District",
  "Panther-Lake-Elementary-School": "Kent School District",
  "Park-Orchard-Elementary-School": "Kent School District",
  "Pine-Tree-Elementary-School": "Kent School District",
  "Ridgewood-Elementary-School": "Kent School District",
  "Sawyer-Woods-Elementary-School": "Kent School District",
  "Scenic-Hill-Elementary-School": "Kent School District",
  "Soos-Creek-Elementary-School": "Kent School District",
  "Springbrook-Elementary-School": "Kent School District",
  "Sunrise-Elementary-School": "Kent School District",
  "Alpac-Elementary-School": "Auburn School District",
  "Arthur-Jacobsen-Elementary-School": "Auburn School District",
  "Auburn-High-School": "Auburn School District",
  "Auburn-Mountainview-High-School": "Auburn School District",
  "Auburn-Riverside-High-School": "Auburn School District",
  "Cascade-Middle-School": "Auburn School District",
  "Chinook-Elementary-School": "Auburn School District",
  "Dick-Scobee-Elementary-School": "Auburn School District",
  "Evergreen-Heights-Elementary-School": "Auburn School District",
  "Gildo-Rey-Elementary-School": "Auburn School District",
  "Hazelwood-Elementary-School": "Auburn School District",
  "Ilalko-Elementary-School": "Auburn School District",
  "Lake-View-Elementary-School": "Auburn School District",
  "Lakeland-Hills-Elementary-School": "Auburn School District",
  "Lea-Hill-Elementary-School": "Auburn School District",
  "Mt-Baker-Middle-School": "Auburn School District",
  "Olympic-Middle-School": "Auburn School District",
  "Pioneer-Elementary-School": "Auburn School District",
  "Rainier-Middle-School": "Auburn School District",
  "Terminal-Park-Elementary-School": "Auburn School District",
  "Washington-Elementary-School": "Auburn School District",
  "West-Auburn-High-School": "Auburn School District",
  "Cleveland-High-School": "Seattle Public Schools",
  "Chief-Sealth-High-District": "Seattle Public Schools",
  "Denny-Middle-School": "Seattle Public Schools",
  "Briarcrest-Elementary": "Shoreline School District",
  "Brookside-Elementary": "Shoreline School District",
  "Cascade-K-8-Community-School": "Shoreline School District",
  "Echo-Lake-Elementary": "Shoreline School District",
  "Einstein-Middle-School": "Shoreline School District",
  "Highland-Terrace-Elementary": "Shoreline School District",
  "Kellogg-Middle-School": "Shoreline School District",
  "Lake-Forest-Park-Elementary": "Shoreline School District",
  "Meridian-Park-Elementary": "Shoreline School District",
  "Parkwood-Elementary": "Shoreline School District",
  "Ridgecrest-Elementary": "Shoreline School District",
  "Shorecrest-High-School": "Shoreline School District",
  "Shorewood-High-School": "Shoreline School District",
  "Syre-Elementary": "Shoreline School District",
  "Arrowhead": "Northshore School District",
  "Bear-Creek": "Northshore School District",
  "Bothell": "Northshore School District",
  "Canyon-Creek": "Northshore School District",
  "Canyon-Park": "Northshore School District",
  "Cottage-Lake": "Northshore School District",
  "Crystal-Springs": "Northshore School District",
  "East-Ridge": "Northshore School District",
  "Fernwood": "Northshore School District",
  "Frank-Love": "Northshore School District",
  "Hollywood-Hill": "Northshore School District",
  "Inglemoor": "Northshore School District",
  "Kenmore-Elementary-School": "Northshore School District",
  "Kenmore-Middle-School": "Northshore School District",
  "Kokanee": "Northshore School District",
  "Leota": "Northshore School District",
  "Lockwood": "Northshore School District",
  "Maywood-Hills": "Northshore School District",
  "Moorlands": "Northshore School District",
  "North-Creek-": "Northshore School District",
  "Northshore-": "Northshore School District",
  "Secondary-Academy-for-Success-(SAS)": "Northshore School District",
  "Shelton-View": "Northshore School District",
  "Skyview-": "Northshore School District",
  "Sunrise": "Northshore School District",
  "Timbercrest-": "Northshore School District",
  "Wellington": "Northshore School District",
  "Westhill": "Northshore School District",
  "Woodin": "Northshore School District",
  "Woodinville": "Northshore School District",
  "Woodmoo": "Northshore School District",
  "Beverly-Park-Elementary-School": "Highline School District",
  "Big-Picture-High-School": "Highline School District",
  "Big-Picture-Middle-School": "Highline School District",
  "Bow-Lake-Elementary-School": "Highline School District",
  "Cascade-Middle-School--Highline": "Highline School District",
  "Cedarhurst-Elementary-School": "Highline School District",
  "Chinook-Middle-School--Highline": "Highline School District",
  "CHOICE-Academy": "Highline School District",
  "Des-Moines-Elementary-School": "Highline School District",
  "Evergreen-High-School": "Highline School District",
  "Gregory-Heights-Elementary-School": "Highline School District",
  "Hazel-Valley-Elementary-School": "Highline School District",
  "Highline-High-School": "Highline School District",
  "Hilltop-Elementary-School": "Highline School District",
  "Madrona-Elementary-School": "Highline School District",
  "Marvista-Elementary-School": "Highline School District",
  "McMicken-Heights-Elementary-School": "Highline School District",
  "Midway-Elementary-School": "Highline School District",
  "Mount-Rainier-High-School": "Highline School District",
  "Mount-View-Elementary-School": "Highline School District",
  "New-Start-High-School": "Highline School District",
  "North-Hill-Elementary-School": "Highline School District",
  "Pacific-Middle-School": "Highline School District",
  "Parkside-Elementary-School": "Highline School District",
  "Puget-Sound-Skills-Center": "Highline School District",
  "Raisbeck-Aviation": "Highline School District",
  "Seahurst-Elementary-School": "Highline School District",
  "Shorewood-Elementary-School": "Highline School District",
  "Southern-Heights-Elementary-School": "Highline School District",
  "Sylvester-Middle-School": "Highline School District",
  "Tyee-High-School": "Highline School District",
  "Waskowitz-Environmental-Leadership-School": "Highline School District",
  "Waskowitz-Outdoor-School": "Highline School District",
  "White-Center-Heights-Elementary-School": "Highline School District",
  "Academic-Institute": "Private",
  "Academy-for-Precision-Learning": "Private",
  "Academy-Schools/Children’s-Academy": "Private",
  "Alcuin-School": "Private",
  "Amazing-Grace-Christian-School": "Private",
  "American-Academy": "Private",
  "Americas-Child-Montessori": "Private",
  "Assumption-St-Bridget": "Private",
  "Auburn-Adventist-Academy": "Private",
  "Auburn-Gateway-School": "Private",
  "Bellevue-Childrens-Academy": "Private",
  "Bellevue-Childrens-Academy-2nd-Location": "Private",
  "Bellevue-Christian-Mack-Elementary": "Private",
  "Bellevue-Christian-School": "Private",
  "Bellevue-Montessori-School": "Private",
  "Bel-Red-Bilingual-Academy": "Private",
  "Bertschi-School": "Private",
  "Billings-Middle-School": "Private",
  "Bishop-Blanchet-High-School": "Private",
  "BK-Play-Academy-for-Gifted-Children": "Private",
  "Blossoming-Hill-Montessori": "Private",
  "Bright-Water-School": "Private",
  "Brightmont-Academy-Seattle": "Private",
  "Brightmont-Academy-Sammamish": "Private",
  "Brightmont-Academy-Woodinville": "Private",
  "Brightmont-Academy-Redmond": "Private",
  "Brocks-Academy": "Private",
  "Brooklake-Christian-School": "Private",
  "Buena-Vista-SDA-School": "Private",
  "Carpe-Diem-Primary-School-Inc": "Private",
  "Cascade-Independent-High-School": "Private",
  "Cascadia-Montessori-School": "Private",
  "Cedar-Crest-Academy": "Private",
  "Cedar-Park-Christian-School": "Private",
  "Cedar-River-Academy": "Private",
  "Cedar-River-Montessori-School": "Private",
  "Chestnut-Hill-Academy-South-Campus": "Private",
  "Child-School": "Private",
  "Christ-the-King-School": "Private",
  "Christian-Faith-School": "Private",
  "Chrysalis-School": "Private",
  "Concordia-Lutheran-School": "Private",
  "Cougar-Mountain-Academy": "Private",
  "Countryside-Montessori-School": "Private",
  "Dartmoor-School-Bellevue": "Private",
  "Dartmoor-School—Issaquah": "Private",
  "Dartmoor-School—Seattle": "Private",
  "Dartmoor-School—Bothell": "Private",
  "Dolan-Academy-Learning-Center": "Private",
  "Eastside-Academy": "Private",
  "Eastside-Catholic-School": "Private",
  "Eastside-Christian-School": "Private",
  "Eastside-Learning-Community": "Private",
  "Eastside-Montessori-Education-Foundation-dba-Arbor-Schools": "Private",
  "Eastside-Preparatory-School": "Private",
  "Emerald-Heights-Academy": "Private",
  "Epiphany-School": "Private",
  "ETC-Preparatory-Academy": "Private",
  "Eton-School": "Private",
  "Evergreen-Academy": "Private",
  "Evergreen-Lutheran-High-School": "Private",
  "Explorer-West-Middle-School": "Private",
  "Fairview-Christian-School": "Private",
  "Faith-Lutheran-School-of-Redmond": "Private",
  "Family-Academy/Academy-NW": "Private",
  "First-Place": "Private",
  "Forest-Ridge-School-of-Sacred-Heart": "Private",
  "French-American-School-of-Puget-Sound": "Private",
  "French-Immersion-School-of-Washington": "Private",
  "Giddens-School": "Private",
  "Glendale-Lutheran-School": "Private",
  "Green-River-Montessori-School": "Private",
  "Hamlin-Robinson-School": "Private",
  "Harbor-School": "Private",
  "Heritage-Christian-Academy": "Private",
  "Hillside-Academy": "Private",
  "Hillside-Student-Community-School": "Private",
  "Holy-Family-Parish-School": "Private",
  "Holy-Family-Bilingual-Catholic-School": "Private",
  "Holy-Innocents-School-of-NW": "Private",
  "Holy-Names-Academy": "Private",
  "Holy-Rosary-Elementary": "Private",
  "Holy-Trinity-Lutheran-School": "Private",
  "Hope-Lutheran-School": "Private",
  "Horizon-School": "Private",
  "Islamic-School-of-Seattle": "Private",
  "Jewish-Day-School": "Private",
  "JF-Kennedy-Catholic-High-School": "Private",
  "Kapka-Cooperative-School": "Private",
  "Kentwood-Christian-Academy": "Private",
  "Kings-Schools": "Private",
  "Kirkland-SDA-School": "Private",
  "Koinonia-Learning-Academy": "Private",
  "Lake-Forest-Park": "Private",
  "Lake-Forest-Park-Montessori": "Private",
  "Lake-WA-Girls-Middle-School": "Private",
  "Lakeside-School": "Private",
  "Laurel-Academy": "Private",
  "Legacy-Classical-Christian-Academy": "Private",
  "Living-Montessori-Academy": "Private",
  "Living-Wisdom-School-of-Seattle": "Private",
  "Matheia-School": "Private",
  "Medina-Academy": "Private",
  "Meridian-School": "Private",
  "MMSC-Day-School": "Private",
  "Montessori-Childrens-House": "Private",
  "Morningside-Academy": "Private",
  "New-Horizon-School": "Private",
  "Newport-Childrens-School": "Private",
  "North-Bend-Montessori-Inc": "Private",
  "Northwest-Free-School": "Private",
  "Northwest-Liberty-School": "Private",
  "Northwest-Montessori": "Private",
  "Northwest-School": "Private",
  "Northwest-School-For-Hearing-Impaired": "Private",
  "Northwest-Yeshiva-High-School": "Private",
  "ODea-High-School": "Private",
  "Open-Window-School": "Private",
  "Our-Lady-of-Fatima-School": "Private",
  "Our-Lady-of-Guadalupe-School": "Private",
  "Our-Lady-Of-The-Lake-School": "Private",
  "Overcomer-Academy": "Private",
  "Overlake-School": "Private",
  "Pacific-Crest-Schools": "Private",
  "Pacific-Learning-Academy": "Private",
  "Pacific-Learning-Center-NW": "Private",
  "Perkins-School": "Private",
  "Praise-Christian-Academy": "Private",
  "Privett-Academy": "Private",
  "Puget-Sound-Adventist-Academy": "Private",
  "Puget-Sound-Community-School": "Private",
  "Rainier-Christian-Elementary-Kent-View": "Private",
  "Rainier-Christian-High-School": "Private",
  "Rainier-Christian-Middle-School": "Private",
  "Rainier-Christian-Preschool-Little-People": "Private",
  "Rainier-Christian-Schools-Maple-Valley-Elementary": "Private",
  "Rainier-Christian-Schools-Maple-Valley-Preschool": "Private",
  "Renton-Christian-School": "Private",
  "Sacred-Heart-School": "Private",
  "Saint-Thomas-School": "Private",
  "Sammamish-Christian-School-Noahs-Ark": "Private",
  "Seattle-Academy-of-Arts/Sciences": "Private",
  "Seattle-Area-German-American-School": "Private",
  "Seattle-Christian-School": "Private",
  "Seattle-Country-Day-School": "Private",
  "Seattle-Girls-School": "Private",
  "Seattle-Hebrew-Academy": "Private",
  "Seattle-Jewish-Community-School": "Private",
  "Seattle-Lutheran-High-School": "Private",
  "Seattle-Prep/Matteo-Ricci-College": "Private",
  "Seattle-Urban-Academy": "Private",
  "Seattle-Waldorf-School": "Private",
  "Shoreline-Christian-School": "Private",
  "Shorewood-Christian-School": "Private",
  "Sno-King-Academy": "Private",
  "Snoqualmie-Springs-School": "Private",
  "Sound-View-Education": "Private",
  "Spanish-Academy": "Private",
  "Spectrum-Academy": "Private",
  "Spring-Academy": "Private",
  "Spring-Valley-Montessori": "Private",
  "Spruce-Street-School": "Private",
  "St-Alphonsus-School": "Private",
  "St-Anne-School": "Private",
  "St-Anthony-School": "Private",
  "St-Benedict-School": "Private",
  "St-Bernadette-School": "Private",
  "St-Brendan-School": "Private",
  "St-Catherine-School": "Private",
  "St-Christopher-Academy": "Private",
  "St-Edwards-School": "Private",
  "St-Francis-of-Assisi-School": "Private",
  "St-George-School": "Private",
  "St-John-School": "Private",
  "St-Joseph-Catholic-School-of-Issaquah": "Private",
  "St-Joseph-School": "Private",
  "St-Louise-School": "Private",
  "St-Luke-School": "Private",
  "St-Madeleine-Sophie-School": "Private",
  "St-Mark-School": "Private",
  "St-Matthew-School": "Private",
  "St-Monica-School": "Private",
  "St-Paul-School": "Private",
  "St-Philomena-School": "Private",
  "St-Therese-School": "Private",
  "St-Vincent-De-Paul-School": "Private",
  "Summit-Classical-Christian-School": "Private",
  "The-Bear-Creek-School": "Private",
  "The-Bush-School": "Private",
  "The-Clearwater-School": "Private",
  "The-Eastside-Montessori-School": "Private",
  "The-Evergreen-School": "Private",
  "The-Lake-and-Park-School": "Private",
  "The-Little-School": "Private",
  "The-Sammamish-Montessori-School": "Private",
  "Three-Cedars-Waldorf-School": "Private",
  "Three-Points-Elementary": "Private",
  "Three-Tree-Montessori": "Private",
  "Tilden-School": "Private",
  "TLC-Academy": "Private",
  "Torah-Day-School-of-Seattle": "Private",
  "UCiC-School": "Private",
  "University-Child-Development-School": "Private",
  "University-Cooperative-School": "Private",
  "University-Preparatory": "Private",
  "Valley-Christian-School": "Private",
  "Valley-School": "Private",
  "Veritas-Academy": "Private",
  "Villa-Academy": "Private",
  "West-Seattle-Montessori-School": "Private",
  "Westside-School": "Private",
  "Whole-Earth-Montessori-School": "Private",
  "Woodinville-Montessori-School": "Private",
  "Work-It-Out": "Private",
  "Zion-Preparatory-Academy": "Private"
};
// END FLAVOR-SPECIFIC CODE

module.exports = PlaceFormView.extend({
  getAttrs: function() {
    var self = this,
      attrs = {},
      locationAttr = this.options.placeConfig.location_item_name,
      $form = this.$("form"),
      attrs = Util.getAttrs($form);

    // Get values off of binary toggle buttons that have not been toggled
    $.each(
      $("input[data-input-type='binary_toggle']:not(:checked)"),
      function() {
        attrs[$(this).attr("name")] = $(this).val();
      },
    );

    _.each(attrs, function(value, key) {
      var itemConfig =
        _.find(
          self.formState.selectedCategoryConfig.fields.concat(
            self.formState.commonFormElements,
          ),
          function(field) {
            return field.name === key;
          },
        ) || {};
      if (itemConfig.autocomplete) {
        Util.saveAutocompleteValue(key, value, 30);
      }
    });

    if (this.geometryEnabled) {
      attrs.geometry = this.geometryEditorView.geometry;
    } else {
      // If the selected category does not have geometry editing enabled,
      // assume we're adding point geometry
      attrs.geometry = {
        type: "Point",
        coordinates: [this.center.lng, this.center.lat],
      };
    }

    if (this.location && locationAttr) {
      attrs[locationAttr] = this.location;
    }

    // BEGIN FLAVOR-SPECIFIC CODE
    attrs.district = SCHOOL_DISTRICTS[attrs["school-name"]] || "";
    // END FLAVOR-SPECIFIC CODE

    return attrs;
  },
  onSubmit: Gatekeeper.onValidSubmit(function(evt) {
    var self = this,
      attrs,
      spinner,
      $fileInputs,
      model,
      router = this.options.router,
      collection = this.options.collectionsSet.places[
        self.formState.selectedCategoryConfig.dataset
      ],
      $button = this.$('[name="save-place-btn"]');

    evt.preventDefault();

    this.$el.find("input[name='url-title']").each(function() {
      $(this).val(Util.prepareCustomUrl($(this).val()));
    });

    if (this.geometryEnabled) {
      attrs = this.onComplexSubmit();
    } else {
      attrs = this.onSimpleSubmit();
    }

    if (attrs) {
      collection.add({
        location_type: this.formState.selectedCategoryConfig.category,
        datasetSlug: _.find(this.options.mapConfig.layers, function(layer) {
          return self.formState.selectedCategoryConfig.dataset == layer.id;
        }).slug,
        datasetId: self.formState.selectedCategoryConfig.dataset,
        showMetadata: self.formState.selectedCategoryConfig.showMetadata,
      });
      model = collection.at(collection.length - 1);

      // wrap quill video embeds in a container so we can enable fluid max dimensions
      this.$("iframe.ql-video").each(function(a) {
        $(this).wrap("<div class='ql-video-container'></div>");
      });

      if (self.formState.attachmentData.length > 0) {
        self.formState.attachmentData.forEach(function(attachment) {
          model.attachmentCollection.add(attachment);
        });
      } else {
        // Add rich text content. If we're on this path, it means no images
        // have been embedded.
        self.$(".rich-text-field").each(function() {
          attrs[$(this).attr("name")] = $(this).find(".ql-editor").html();
        });
      }

      $button.attr("disabled", "disabled");
      spinner = new Spinner(Shareabouts.smallSpinnerOptions).spin(
        self.$(".form-spinner")[0],
      );
      Util.log("USER", "new-place", "submit-place-btn-click");
      Util.setStickyFields(
        attrs,
        Shareabouts.Config.survey.items,
        Shareabouts.Config.place.items,
      );

      // Save and redirect
      model.save(attrs, {
        success: function(response) {
          if (
            self.formState.attachmentData.length > 0 &&
            self.$(".rich-text-field").length > 0
          ) {
            // If there is rich text image content on the form, add it now and replace
            // img data urls with their S3 bucket equivalents.
            // NOTE: this success handler is called when all attachment models have
            // saved to the server.
            model.attachmentCollection.fetch({
              reset: true,
              success: function(collection) {
                collection.each(function(attachment) {

                  // BEGIN FLAVOR-SPECIFIC CODE
                  // In case attachments are added with both the cover image button
                  // and within a rich text field, ensure that all attachments
                  // are available on initial detail view render.
                  model.get("attachments").push(attachment);
                  // END FLAVOR-SPECIFIC CODE

                  self
                    .$("img[name='" + attachment.get("name") + "']")
                    .attr("src", attachment.get("file"));
                });

                // Add content that has been modified by Quill rich text fields
                self.$(".rich-text-field").each(function() {
                  attrs[$(this).attr("name")] = $(this).find(".ql-editor").html();
                });

                model.saveWithoutAttachments(attrs, {
                  success: function(response) {
                    Util.log("USER", "new-place", "successfully-add-place");
                    router.navigate(Util.getUrl(model), { trigger: true });
                  },
                  error: function() {
                    Util.log("USER", "new-place", "fail-to-embed-attachments");
                  },
                  complete: function() {
                    if (self.geometryEditorView) {
                      self.geometryEditorView.tearDown();
                    }
                    $button.removeAttr("disabled");
                    spinner.stop();
                    self.resetFormState();
                    collection.each(function(attachment) {
                      attachment.set({ saved: true });
                    });
                  },
                });
              },
              error: function() {
                Util.log("USER", "new-place", "fail-to-fetch-embed-urls");
              },
            });
          } else {
            // Otherwise, go ahead and route to the newly-created place.
            Util.log("USER", "new-place", "successfully-add-place");
            router.navigate(Util.getUrl(model), { trigger: true });
            if (self.geometryEditorView) {
              self.geometryEditorView.tearDown();
            }
            $button.removeAttr("disabled");
            spinner.stop();
            self.resetFormState();
          }
        },
        error: function() {
          Util.log("USER", "new-place", "fail-to-add-place");
        },
        wait: true,
      });
    }
  }, null)
});
