module.exports = {

  /** randomNumber() generates random number including min, max */
  randomNumber: function (min = 0, max) {
    if (!parseInt(min) && !parseInt(max))
      return (new Error("provide valid integers"));

    return Math.floor(
      Math.random() *
      (parseInt(max) - parseInt(min))
    ) + parseInt(min);
  },

  /** slugify() generate slug of a string. */
  slugify: function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')   // remove invalid chars
      .replace(/\s+/g, '-')                 // collapse whitespace and replace by -
      .replace(/-+/g, '-');                 // collapse dashes

    return str;
  },

  /** timeToText() creates textual representation of time. */
  timeToText: function(milisec) {
    let seconds = (milisec / 1000).toFixed(1);
    let minutes = (milisec / (1000 * 60)).toFixed(1);
    let hours = (milisec / (1000 * 60 * 60)).toFixed(1);
    let days = (milisec / (1000 * 60 * 60 * 24)).toFixed(1);
  
    if (seconds < 60) 
      return seconds + ' Sec';
    else if (minutes < 60) 
      return minutes + ' Min';
    else if (hours < 24) 
      return hours + ' Hrs';
    else 
      return days + ' Days';
  }
}