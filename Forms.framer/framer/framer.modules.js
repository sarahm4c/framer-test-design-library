require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"InputField":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.InputField = (function(superClass) {
  var INPUT_HIDE_PSUEDO_UI, INPUT_SELECTOR_NUMBER, INPUT_SELECTOR_SEARCH, PATTERN_NUMBER;

  extend(InputField, superClass);

  PATTERN_NUMBER = "[0-9]*";

  INPUT_HIDE_PSUEDO_UI = "{ -webkit-appearance: none; display: none; }";

  INPUT_SELECTOR_NUMBER = "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button";

  INPUT_SELECTOR_SEARCH = "input[type=search]::-webkit-search-cancel-button";

  Events.Input = "InputField.OnInput";

  Events.Focus = "InputField.OnFocus";

  Events.Blur = "InputField.OnBlur";

  Events.Valid = "InputField.OnValid";

  Events.Invalid = "InputField.OnInvalid";

  Events.Match = "InputField.OnMatch";

  Events.FileData = "InputField.OnFileData";

  InputField.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(v) {
      if (!v) {
        return;
      }
      if (this.input) {
        return this.changeInputValue(v);
      }
    }
  });

  function InputField(options) {
    var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, inputStyle, key, ref, val;
    this.options = options != null ? options : {};
    this.fileSelectHandler = bind(this.fileSelectHandler, this);
    this.isNumber = false;
    this.isSearch = false;
    this.isFile = false;
    this.isEmpty = true;
    this.isValid = null;
    this.isFileMulti = false;
    this.isFilePhoto = false;
    this.isFileVideo = false;
    this.originalTextColor = null;
    if ((this.options.pattern != null) || (this.options.match != null)) {
      this.shouldCheckValidity = true;
    }
    if (this.options.lineHeight != null) {
      this.options.lineHeight = this.options.lineHeight + "px";
    }
    if ((base = this.options).name == null) {
      base.name = this.options.type + "Input";
    }
    if ((base1 = this.options).color == null) {
      base1.color = "#000";
    }
    if ((base2 = this.options).backgroundColor == null) {
      base2.backgroundColor = "";
    }
    if ((base3 = this.options).borderRadius == null) {
      base3.borderRadius = 0;
    }
    if ((base4 = this.options).type == null) {
      base4.type = "text";
    }
    if ((base5 = this.options).fontSize == null) {
      base5.fontSize = 32;
    }
    if ((base6 = this.options).fontWeight == null) {
      base6.fontWeight = 300;
    }
    if ((base7 = this.options).fontFamily == null) {
      base7.fontFamily = "-apple-system, Helvetica Neue";
    }
    if ((base8 = this.options).lineHeight == null) {
      base8.lineHeight = 1.25;
    }
    if ((base9 = this.options).indent == null) {
      base9.indent = 0;
    }
    if ((base10 = this.options).placeHolderFocus == null) {
      base10.placeHolderFocus = null;
    }
    if ((base11 = this.options).placeHolderColor == null) {
      base11.placeHolderColor = null;
    }
    if (_.startsWith(this.options.type, ["file"])) {
      this.options.fontSize = "inherit";
      this.options.fontWeight = 400;
      this.options.lineHeight = 1;
    }
    InputField.__super__.constructor.call(this, this.options);
    switch (this.options.type) {
      case "search":
        this.isSearch = true;
        break;
      case "number":
        this.isNumber = true;
        break;
      case "numbers-only":
      case "number-only":
        this.isNumber = true;
        this.options.type = this.options.pattern != null ? "number" : "text";
        this.options.pattern = this.options.pattern != null ? this.options.pattern : PATTERN_NUMBER;
        break;
      case "file":
      case "file-multiple":
      case "file-image":
      case "file-video":
        this.isFile = true;
        if (this.options.type === "file-image") {
          this.isFilePhoto = true;
        }
        if (this.options.type === "file-video") {
          this.isFileVideo = true;
        }
        if (this.options.type === "file-multiple") {
          this.isFileMulti = true;
        }
        this.options.type = "file";
    }
    this.html += (function() {
      switch (false) {
        case !this.isNumber:
          return "<style type='text/css'>" + INPUT_SELECTOR_NUMBER + INPUT_HIDE_PSUEDO_UI + "</style>";
        case !this.isSearch:
          return "<style type='text/css'>" + INPUT_SELECTOR_SEARCH + INPUT_HIDE_PSUEDO_UI + "</style>";
        default:
          return "";
      }
    }).call(this);
    if (this.options.placeHolderColor != null) {
      this.html += "<style type='text/css'>::-webkit-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-moz-placeholder { color: " + this.options.placeHolderColor + "; } :-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } :placeholder-shown { color: " + this.options.placeHolderColor + "; }</style>";
    }
    this.input = document.createElement("input");
    this.input.type = this.options.type;
    if (this.options.value != null) {
      this.input.value = this.options.value;
    }
    if (this.options.placeHolder != null) {
      this.input.placeholder = this.options.placeHolder;
    }
    if (this.options.pattern != null) {
      this.input.pattern = this.options.pattern;
    }
    if (this.options.maxLength != null) {
      this.input.setAttribute("maxLength", this.options.maxLength);
    }
    this.input.setAttribute("autocapitalize", (this.options.autoCapitalize === true ? "on" : "off"));
    this.input.setAttribute("autocomplete", (this.options.autoComplete === true ? "on" : "off"));
    this.input.setAttribute("autocorrect", (this.options.autoCorrect === true ? "on" : "off"));
    if (this.isFileMulti) {
      this.input.setAttribute("multiple", "multiple");
    }
    if (this.isFileVideo) {
      this.input.setAttribute("accept", "video/*");
    }
    if (this.isFilePhoto) {
      this.input.setAttribute("accept", "image/*");
    }
    this._element.appendChild(this.input);
    this.isEmpty = !(((ref = this.options.value) != null ? ref.length : void 0) > 0);
    this.originalTextColor = this.options.color;
    inputStyle = {
      font: this.options.fontWeight + " " + this.options.fontSize + "px/" + this.options.lineHeight + " " + this.options.fontFamily,
      outline: "none",
      textIndent: this.options.indent + "px",
      backgroundColor: "transparent",
      height: "100%",
      width: "100%",
      margin: "0",
      padding: "0",
      verticalAlign: "top",
      "-webkit-appearance": "none",
      opacity: this.isFile ? 0 : 1,
      pointerEvents: this.isFile ? "all" : "auto"
    };
    for (key in inputStyle) {
      val = inputStyle[key];
      this.input.style[key] = val;
    }
    if (this.options.color != null) {
      this.input.style.color = this.options.color;
    }
    this.input.onfocus = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (_this.options.placeHolderFocus != null) {
          _this.input.placeholder = _this.options.placeHolderFocus;
        }
        document.body.scrollTop = 0;
        return _this.emit(Events.Focus, _this.input.value, _this);
      };
    })(this);
    this.input.onblur = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (!(_this.input.placeholder === _this.options.placeHolder || (_this.options.placeHolder == null))) {
          _this.input.placeholder = _this.options.placeHolder;
        }
        return _this.emit(Events.Blur, _this.input.value, _this);
      };
    })(this);
    this.input.oninput = (function(_this) {
      return function() {
        var ref1;
        _this.isEmpty = !(((ref1 = _this.input.value) != null ? ref1.length : void 0) > 0);
        _this.emit(Events.Input, _this.input.value, _this);
        return _this.checkValidity();
      };
    })(this);
    if (this.isFile) {
      this.input.addEventListener("change", this.fileSelectHandler, false);
    }
    this.on(Events.TouchEnd, function() {
      return this.input.focus();
    });
    this.on("change:color", function() {
      return this.changeInputTextColor();
    });
    this.wrapFileInputToParent();
  }

  InputField.prototype.fileSelectHandler = function(event) {
    var file, reader;
    if (!event) {
      return;
    }
    file = event.target.files[0];
    if (file.type.indexOf("image") === 0) {
      reader = new FileReader();
      reader.onload = (function(_this) {
        return function(readEvent) {
          _this.emit(Events.FileData, readEvent.target.result, _this);
          console.log(readEvent);
          return console.log(file);
        };
      })(this);
      return reader.readAsDataURL(file);
    }
  };

  InputField.prototype.checkValidity = function() {
    var ref, validity;
    if (!this.shouldCheckValidity) {
      return;
    }
    if (this.options.pattern != null) {
      validity = this.input.checkValidity();
      this.isEmpty = !(((ref = this.input.value) != null ? ref.length : void 0) > 0);
      if (this.isValid !== validity || this.isEmpty) {
        if (this.isEmpty || !validity) {
          this.isValid = false;
          this.emit(Events.Invalid, this.input.value, this);
        } else {
          this.isValid = true;
          this.emit(Events.Valid, this.input.value, this);
        }
      }
    }
    if (this.checkMatch()) {
      this.isValid = true;
      return this.emit(Events.Match, this.input.value, this);
    }
  };

  InputField.prototype.checkMatch = function() {
    var i, len, match, ref;
    if (this.options.match == null) {
      return false;
    }
    if (Array.isArray(this.options.match)) {
      ref = this.options.match;
      for (i = 0, len = ref.length; i < len; i++) {
        match = ref[i];
        if (this.input.value.indexOf(match) > -1) {
          return true;
        }
      }
    } else {
      if (this.input.value.indexOf(this.options.match) > -1) {
        return true;
      }
    }
    return false;
  };

  InputField.prototype.clear = function() {
    this.input.value = "";
    this.isValid = null;
    return this.isEmpty = true;
  };

  InputField.prototype.changeInputTextColor = function() {
    return this.input.style.color = this.color.toHexString();
  };

  InputField.prototype.changeInputValue = function(v) {
    this.input.value = v;
    return this.input.oninput();
  };

  InputField.prototype.wrapFileInputToParent = function() {
    if (!this.isFile) {
      return;
    }
    if (this.parent) {
      this.width = this.parent.frame.width;
      return this.height = this.parent.frame.height;
    } else {
      this.input.style.opacity = 1;
      this.input.style.lineHeight = this.height + "px";
      this.input.style.color = "#fff";
      this.input.style.textIndent = "1em";
      return this.backgroundColor = "#fff";
    }
  };

  return InputField;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9JbnB1dEZpZWxkLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIENyZWF0ZWQgMDcgSmFuIDIwMTYgYnkgSm9yZGFuIFJvYmVydCBEb2Jzb24gLyBAam9yZGFuZG9ic29uIC8gSm9yZGFuRG9ic29uLmNvbVxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiNcbiMgVmFsaWQgJiBUZXN0ZWQgSW5wdXRGaWVsZCBUeXBlczogXG4jIFx0XCJ0ZXh0XCIsIFwiZW1haWxcIiwgXCJudW1iZXJcIiwgXCJudW1iZXItb25seVwiLCBcInVybFwiLCBcInRlbFwiLCBcInBhc3N3b3JkXCIsIFwic2VhcmNoXCJcbiMgXHRcInRpbWVcIiwgXCJtb250aFwiLCBcImRhdGVcIiwgXCJkYXRldGltZS1sb2NhbFwiLCBcImZpbGVcIiwgXCJmaWxlLW11bHRpcGxlXCIsIFwiZmlsZS1pbWFnZVwiLCBcImZpbGUtdmlkZW9cIlxuIyBcbiMgVGhlIHRpbWUgJiBkYXRlIHR5cGVzIFJFUVVJUkUgdGhlIHZhbHVlIHByb3BlcnR5IGlzIGluIGEgY29ycmVjdCBmb3JtYXQgJiBJR05PUkUgdGhlIHBsYWNlaG9sZGVyIHByb3BlcnR5LlxuIyBcbiMgSGVyZSdzIGEgZmV3IGV4YW1wbGVzIHRvIHVzZSBmb3IgdGhlIHZhbHVlOiBwcm9wZXJ0eSB3aGVuIHlvdSBjcmVhdGUgdGhlbTpcbiNcbiMgXHQqIHRpbWU6IFwiMTI6MzhcIlxuIyBcdCogbW9udGg6IFwiMjAxNi0wMVwiXG4jIFx0KiBkYXRlOiBcIjIwMTYtMDEtMDRcIlxuIyBcdCogZGF0ZXRpbWUtbG9jYWw6IFwiMjAxNi0wMS0wNFQxMjo0NDozMS4xOTJcIlxuI1xuIyBOT1RFUyAvIFxuIyBcdFNvbWUgdHlwZXMgd29yayBiZXR0ZXIgdGhhbiBvdGhlcnMgb24gbW9iaWxlIG9yIGRpc3BsYXkgZGlmZmVyZW50bHkgdGhhbiBkZXNrdG9wLlxuIyBcdEFsbCBwcm9wZXJ0aWVzIHdpbGwgd29yayB3aXRoIGlucHV0IHR5cGUgXCJ0ZXh0XCIgYnV0IG1heSBub3Qgd29yayB3aXRoIG90aGVyIHR5cGVzLlxuIyBcdFNvbWUgZXZlbnRzIHdvbid0IGZpcmUgaWYgeW91IGVudGVyIGluY29ycmVjdCBjb250ZW50IGZvciB0aGUgZmllbGQgdHlwZTogaS5lLiBcImhlbGxvXCIgZm9yIGlucHV0IHR5cGUgXCJudW1iZXJcIi5cbiMgXHRGaW5kIG1vcmUgcGF0dGVybnMgZm9yIFZhbGlkIGFuZCBJbnZhbGlkIGV2ZW50cyBhdCBodHRwOi8vaHRtbDVwYXR0ZXJuLmNvbVxuIyBcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cblxuY2xhc3MgZXhwb3J0cy5JbnB1dEZpZWxkIGV4dGVuZHMgTGF5ZXJcblxuXHRQQVRURVJOX05VTUJFUiA9IFwiWzAtOV0qXCJcblx0XG5cdElOUFVUX0hJREVfUFNVRURPX1VJICA9IFwieyAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7IGRpc3BsYXk6IG5vbmU7IH1cIlxuXHRJTlBVVF9TRUxFQ1RPUl9OVU1CRVIgPSBcImlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uXCJcblx0SU5QVVRfU0VMRUNUT1JfU0VBUkNIID0gXCJpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b25cIlxuXHRcblx0RXZlbnRzLklucHV0ICAgID0gXCJJbnB1dEZpZWxkLk9uSW5wdXRcIlxuXHRFdmVudHMuRm9jdXMgICAgPSBcIklucHV0RmllbGQuT25Gb2N1c1wiXG5cdEV2ZW50cy5CbHVyICAgICA9IFwiSW5wdXRGaWVsZC5PbkJsdXJcIlxuXHRFdmVudHMuVmFsaWQgICAgPSBcIklucHV0RmllbGQuT25WYWxpZFwiXG5cdEV2ZW50cy5JbnZhbGlkICA9IFwiSW5wdXRGaWVsZC5PbkludmFsaWRcIlxuXHRFdmVudHMuTWF0Y2ggICAgPSBcIklucHV0RmllbGQuT25NYXRjaFwiXG5cdEV2ZW50cy5GaWxlRGF0YSA9IFwiSW5wdXRGaWVsZC5PbkZpbGVEYXRhXCJcblx0XG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT5cblx0XHRcdEBpbnB1dC52YWx1ZVxuXHRcdFx0XG5cdFx0c2V0OiAodikgLT5cblx0XHRcdHJldHVybiB1bmxlc3MgdlxuXHRcdFx0aWYgQGlucHV0XG5cdFx0XHRcdEBjaGFuZ2VJbnB1dFZhbHVlIHZcblxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFxuXHRcdEBpc051bWJlciA9IGZhbHNlXG5cdFx0QGlzU2VhcmNoID0gZmFsc2Vcblx0XHRAaXNGaWxlICAgPSBmYWxzZVxuXHRcdFxuXHRcdEBpc0VtcHR5ICA9IHRydWVcblx0XHRAaXNWYWxpZCAgPSBudWxsXG5cdFx0XG5cdFx0QGlzRmlsZU11bHRpID0gZmFsc2Vcblx0XHRAaXNGaWxlUGhvdG8gPSBmYWxzZVxuXHRcdEBpc0ZpbGVWaWRlbyA9IGZhbHNlXG5cdFx0XG5cdFx0QG9yaWdpbmFsVGV4dENvbG9yID0gbnVsbFxuXHRcdFxuXHRcdCMgTWFrZSBzdXJlIHdlIHNldCB0aGUgQ2hlY2tpbmcgRmxhZ1xuXHRcdEBzaG91bGRDaGVja1ZhbGlkaXR5ID0gdHJ1ZSBpZiBAb3B0aW9ucy5wYXR0ZXJuPyBvciBAb3B0aW9ucy5tYXRjaD9cblxuXHRcdCMgTWFrZSBzdXJlIHRoaXMgaXMgaW4gcHhcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0ID0gXCIje0BvcHRpb25zLmxpbmVIZWlnaHR9cHhcIiBpZiBAb3B0aW9ucy5saW5lSGVpZ2h0P1xuXHRcdCBcdFx0XHRcdFx0XHRcdFx0XG5cdFx0IyBGcmFtZXIgTGF5ZXIgUHJvcHNcblx0XHRAb3B0aW9ucy5uYW1lICAgICAgICAgICAgID89IFwiI3tAb3B0aW9ucy50eXBlfUlucHV0XCJcblx0XHRAb3B0aW9ucy5jb2xvciAgICAgICAgICAgID89IFwiIzAwMFwiXG5cdFx0QG9wdGlvbnMuYmFja2dyb3VuZENvbG9yICA/PSBcIlwiXG5cdFx0QG9wdGlvbnMuYm9yZGVyUmFkaXVzICAgICA/PSAwXG5cblx0XHQjIEN1c3RvbSBMYXllciBQcm9wc1x0XHRcblx0XHRAb3B0aW9ucy50eXBlICAgICAgICAgICAgID89IFwidGV4dFwiXG5cdFx0QG9wdGlvbnMuZm9udFNpemUgICAgICAgICA/PSAzMlxuXHRcdEBvcHRpb25zLmZvbnRXZWlnaHQgICAgICAgPz0gMzAwXG5cdFx0QG9wdGlvbnMuZm9udEZhbWlseSAgICAgICA/PSBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSBOZXVlXCJcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0ICAgICAgID89IDEuMjVcblx0XHRAb3B0aW9ucy5pbmRlbnQgICAgICAgICAgID89IDBcblx0XHRAb3B0aW9ucy5wbGFjZUhvbGRlckZvY3VzID89IG51bGxcblx0XHRAb3B0aW9ucy5wbGFjZUhvbGRlckNvbG9yID89IG51bGxcblxuXG5cdFx0IyBTdGFydGVkIHdvcmsgb24gZmlsZVxuXHRcdGlmIF8uc3RhcnRzV2l0aChAb3B0aW9ucy50eXBlLCBbXCJmaWxlXCJdKVxuXHRcdFx0QG9wdGlvbnMuZm9udFNpemUgPSBcImluaGVyaXRcIlxuXHRcdFx0QG9wdGlvbnMuZm9udFdlaWdodCA9IDQwMFxuXHRcdFx0QG9wdGlvbnMubGluZUhlaWdodCA9IDFcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0IyBBZGp1c3QgYSBmZXcgdGhpbmdzIGZvciB2YXJpb3VzIHR5cGVzXG5cdFx0XG5cdFx0c3dpdGNoIEBvcHRpb25zLnR5cGVcblx0XHRcdHdoZW4gXCJzZWFyY2hcIiB0aGVuIEBpc1NlYXJjaCA9IHRydWVcblx0XHRcdHdoZW4gXCJudW1iZXJcIiB0aGVuIEBpc051bWJlciA9IHRydWVcblx0XHRcdHdoZW4gXCJudW1iZXJzLW9ubHlcIiwgXCJudW1iZXItb25seVwiXG5cdFx0XHRcdEBpc051bWJlciA9IHRydWVcblx0XHRcdFx0QG9wdGlvbnMudHlwZSAgICA9IGlmIEBvcHRpb25zLnBhdHRlcm4/IHRoZW4gXCJudW1iZXJcIiAgICAgICAgIGVsc2UgXCJ0ZXh0XCJcblx0XHRcdFx0QG9wdGlvbnMucGF0dGVybiA9IGlmIEBvcHRpb25zLnBhdHRlcm4/IHRoZW4gQG9wdGlvbnMucGF0dGVybiBlbHNlIFBBVFRFUk5fTlVNQkVSXG5cdFx0XHR3aGVuIFwiZmlsZVwiLCBcImZpbGUtbXVsdGlwbGVcIiwgXCJmaWxlLWltYWdlXCIsIFwiZmlsZS12aWRlb1wiXG5cdFx0XHRcdEBpc0ZpbGUgPSB0cnVlXG5cdFx0XHRcdEBpc0ZpbGVQaG90byA9IHRydWUgaWYgQG9wdGlvbnMudHlwZSBpcyBcImZpbGUtaW1hZ2VcIlxuXHRcdFx0XHRAaXNGaWxlVmlkZW8gPSB0cnVlIGlmIEBvcHRpb25zLnR5cGUgaXMgXCJmaWxlLXZpZGVvXCJcblx0XHRcdFx0QGlzRmlsZU11bHRpID0gdHJ1ZSBpZiBAb3B0aW9ucy50eXBlIGlzIFwiZmlsZS1tdWx0aXBsZVwiXG5cdFx0XHRcdEBvcHRpb25zLnR5cGUgPSBcImZpbGVcIlxuXHRcdFx0XHRcblx0XHRcblx0XHRAaHRtbCArPSBzd2l0Y2hcblx0XHRcdHdoZW4gQGlzTnVtYmVyIHRoZW4gXCI8c3R5bGUgdHlwZT0ndGV4dC9jc3MnPiN7SU5QVVRfU0VMRUNUT1JfTlVNQkVSfSN7SU5QVVRfSElERV9QU1VFRE9fVUl9PC9zdHlsZT5cIlxuXHRcdFx0d2hlbiBAaXNTZWFyY2ggdGhlbiBcIjxzdHlsZSB0eXBlPSd0ZXh0L2Nzcyc+I3tJTlBVVF9TRUxFQ1RPUl9TRUFSQ0h9I3tJTlBVVF9ISURFX1BTVUVET19VSX08L3N0eWxlPlwiXG5cdFx0XHRlbHNlIFwiXCJcblxuXHRcdGlmIEBvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3I/XG5cdFx0XHRAaHRtbCArPSBcIjxzdHlsZSB0eXBlPSd0ZXh0L2Nzcyc+Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOjotbW96LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3J9OyB9IDo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOnBsYWNlaG9sZGVyLXNob3duIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH08L3N0eWxlPlwiXG5cdFx0XHRcblx0XHQjIENyZWF0ZSBUaGUgSW5wdXRcblx0XHRcblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdCMgVGV4dCBUeXBlIEFkanVzdG1lbnRzXG5cdFx0QGlucHV0LnR5cGUgICAgICAgID0gQG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC52YWx1ZSAgICAgICA9IEBvcHRpb25zLnZhbHVlICAgICAgICAgICAgICAgICAgaWYgQG9wdGlvbnMudmFsdWU/XG5cdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXIgICAgICAgICAgICBpZiBAb3B0aW9ucy5wbGFjZUhvbGRlcj9cblx0XHRAaW5wdXQucGF0dGVybiAgICAgPSBAb3B0aW9ucy5wYXR0ZXJuICAgICAgICAgICAgICAgIGlmIEBvcHRpb25zLnBhdHRlcm4/XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcIm1heExlbmd0aFwiLCBAb3B0aW9ucy5tYXhMZW5ndGgpIGlmIEBvcHRpb25zLm1heExlbmd0aD9cblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NhcGl0YWxpemVcIiwgKGlmIEBvcHRpb25zLmF1dG9DYXBpdGFsaXplIGlzIHRydWUgdGhlbiBcIm9uXCIgZWxzZSBcIm9mZlwiKSlcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NvbXBsZXRlXCIsICAgKGlmIEBvcHRpb25zLmF1dG9Db21wbGV0ZSAgIGlzIHRydWUgdGhlbiBcIm9uXCIgZWxzZSBcIm9mZlwiKSlcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NvcnJlY3RcIiwgICAgKGlmIEBvcHRpb25zLmF1dG9Db3JyZWN0ICAgIGlzIHRydWUgdGhlbiBcIm9uXCIgZWxzZSBcIm9mZlwiKSlcblx0XHQjIEZpbGUgVHlwZSBBZGp1c3RtZW50cyBcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwibXVsdGlwbGVcIiwgXCJtdWx0aXBsZVwiKSBpZiBAaXNGaWxlTXVsdGlcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYWNjZXB0XCIsICAgXCJ2aWRlby8qXCIgKSBpZiBAaXNGaWxlVmlkZW9cblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlKFwiYWNjZXB0XCIsICAgXCJpbWFnZS8qXCIgKSBpZiBAaXNGaWxlUGhvdG9cblx0XHRcblx0XHRAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0XG5cdFx0IyBTZXR1cCBWYWx1ZXNcblx0XHRAaXNFbXB0eSAgICAgICAgICAgPSAhKEBvcHRpb25zLnZhbHVlPy5sZW5ndGggPiAwKVxuXHRcdEBvcmlnaW5hbFRleHRDb2xvciA9IEBvcHRpb25zLmNvbG9yXG5cdFx0XG5cdFx0IyBTZXR1cCBJbnB1dCBTdHlsZVxuXHRcdFxuXHRcdGlucHV0U3R5bGUgPVxuXHRcdFx0Zm9udDogXCIje0BvcHRpb25zLmZvbnRXZWlnaHR9ICN7QG9wdGlvbnMuZm9udFNpemV9cHgvI3tAb3B0aW9ucy5saW5lSGVpZ2h0fSAje0BvcHRpb25zLmZvbnRGYW1pbHl9XCJcblx0XHRcdG91dGxpbmU6IFwibm9uZVwiXG5cdFx0XHR0ZXh0SW5kZW50OiBcIiN7QG9wdGlvbnMuaW5kZW50fXB4XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRoZWlnaHQ6IFwiMTAwJVwiXG5cdFx0XHR3aWR0aDogIFwiMTAwJVwiXG5cdFx0XHRtYXJnaW46ICBcIjBcIlxuXHRcdFx0cGFkZGluZzogXCIwXCJcblx0XHRcdHZlcnRpY2FsQWxpZ246IFwidG9wXCJcblx0XHRcdFwiLXdlYmtpdC1hcHBlYXJhbmNlXCI6IFwibm9uZVwiXG5cdFx0XHRvcGFjaXR5OiAgICAgICBpZiBAaXNGaWxlIHRoZW4gMCAgICAgZWxzZSAxXG5cdFx0XHRwb2ludGVyRXZlbnRzOiBpZiBAaXNGaWxlIHRoZW4gXCJhbGxcIiBlbHNlIFwiYXV0b1wiXG5cdFx0XHRcblx0XHRAaW5wdXQuc3R5bGVba2V5XSAgPSB2YWwgZm9yIGtleSwgdmFsIG9mIGlucHV0U3R5bGVcblx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBAb3B0aW9ucy5jb2xvciBpZiBAb3B0aW9ucy5jb2xvcj9cblx0XHRcblx0XHRAaW5wdXQub25mb2N1cyA9ID0+XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblx0XHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IEBvcHRpb25zLnBsYWNlSG9sZGVyRm9jdXMgaWYgQG9wdGlvbnMucGxhY2VIb2xkZXJGb2N1cz9cblx0XHRcdGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMFxuXHRcdFx0QGVtaXQoRXZlbnRzLkZvY3VzLCBAaW5wdXQudmFsdWUsIEApXG5cblx0XHRAaW5wdXQub25ibHVyICA9ID0+XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblx0XHRcdHVubGVzcyBAaW5wdXQucGxhY2Vob2xkZXIgaXMgQG9wdGlvbnMucGxhY2VIb2xkZXIgb3IgIUBvcHRpb25zLnBsYWNlSG9sZGVyP1xuXHRcdFx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlclxuXHRcdFx0QGVtaXQoRXZlbnRzLkJsdXIsIEBpbnB1dC52YWx1ZSwgQClcblxuXHRcdEBpbnB1dC5vbmlucHV0ID0gPT5cblx0XHRcdEBpc0VtcHR5ID0gISggQGlucHV0LnZhbHVlPy5sZW5ndGggPiAwKVxuXHRcdFx0QGVtaXQoRXZlbnRzLklucHV0LCBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRAY2hlY2tWYWxpZGl0eSgpXG5cdFx0XHRcblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBAZmlsZVNlbGVjdEhhbmRsZXIsIGZhbHNlKSBpZiBAaXNGaWxlXG5cdFx0XHRcblx0XHRAb24gRXZlbnRzLlRvdWNoRW5kLCAtPiBAaW5wdXQuZm9jdXMoKVxuXHRcdEBvbiBcImNoYW5nZTpjb2xvclwiLCAgLT4gQGNoYW5nZUlucHV0VGV4dENvbG9yKClcblx0XHRcblx0XHRAd3JhcEZpbGVJbnB1dFRvUGFyZW50KClcblx0XHRcblxuXHQjIGh0dHA6Ly93d3cuc2l0ZXBvaW50LmNvbS9odG1sNS1qYXZhc2NyaXB0LW9wZW4tZHJvcHBlZC1maWxlcy9cblx0ZmlsZVNlbGVjdEhhbmRsZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gdW5sZXNzIGV2ZW50ICMgZml4IENoZWNrIHRoaXMgYmV0dGVyP1xuXHRcdGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF1cdFx0XG5cdFx0aWYgZmlsZS50eXBlLmluZGV4T2YoXCJpbWFnZVwiKSA9PSAwXG5cdFx0XHRyZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cdFx0XHRyZWFkZXIub25sb2FkID0gKHJlYWRFdmVudCkgPT4gXG5cdFx0XHRcdEBlbWl0KEV2ZW50cy5GaWxlRGF0YSwgcmVhZEV2ZW50LnRhcmdldC5yZXN1bHQsIEApXG5cdFx0XHRcdGNvbnNvbGUubG9nIHJlYWRFdmVudFxuXHRcdFx0XHRjb25zb2xlLmxvZyBmaWxlXG5cdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTCBmaWxlXG5cdFx0XG5cdGNoZWNrVmFsaWRpdHk6IC0+XG5cdFx0cmV0dXJuIHVubGVzcyBAc2hvdWxkQ2hlY2tWYWxpZGl0eVxuXG5cdFx0aWYgQG9wdGlvbnMucGF0dGVybj9cblx0XHRcdHZhbGlkaXR5ID0gQGlucHV0LmNoZWNrVmFsaWRpdHkoKVxuXHRcdFx0QGlzRW1wdHkgPSAhKCBAaW5wdXQudmFsdWU/Lmxlbmd0aCA+IDApXG5cdFx0XHRcblx0XHRcdGlmIEBpc1ZhbGlkIGlzbnQgdmFsaWRpdHkgb3IgQGlzRW1wdHlcblx0XHRcdFx0aWYgQGlzRW1wdHkgb3IgIXZhbGlkaXR5XG5cdFx0XHRcdFx0QGlzVmFsaWQgPSBmYWxzZVxuXHRcdFx0XHRcdEBlbWl0KEV2ZW50cy5JbnZhbGlkLCBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAaXNWYWxpZCA9IHRydWVcblx0XHRcdFx0XHRAZW1pdChFdmVudHMuVmFsaWQsICAgQGlucHV0LnZhbHVlLCBAKVxuXHRcdFx0XHRcdFxuXHRcdGlmIEBjaGVja01hdGNoKClcblx0XHRcdEBpc1ZhbGlkID0gdHJ1ZVxuXHRcdFx0QGVtaXQoRXZlbnRzLk1hdGNoLCBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRcblx0Y2hlY2tNYXRjaDogLT5cblx0XHRyZXR1cm4gZmFsc2UgdW5sZXNzIEBvcHRpb25zLm1hdGNoP1xuXHRcdGlmIEFycmF5LmlzQXJyYXkoQG9wdGlvbnMubWF0Y2gpXG5cdFx0XHRmb3IgbWF0Y2ggaW4gQG9wdGlvbnMubWF0Y2hcblx0XHRcdFx0cmV0dXJuIHRydWUgaWYgQGlucHV0LnZhbHVlLmluZGV4T2YobWF0Y2gpID4gLTFcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHJ1ZSBpZiBAaW5wdXQudmFsdWUuaW5kZXhPZihAb3B0aW9ucy5tYXRjaCkgPiAtMVxuXHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XG5cdGNsZWFyOiAtPlxuXHRcdEBpbnB1dC52YWx1ZSA9IFwiXCJcblx0XHRAaXNWYWxpZCA9IG51bGxcblx0XHRAaXNFbXB0eSA9IHRydWVcblx0XHRcblx0Y2hhbmdlSW5wdXRUZXh0Q29sb3I6IC0+IFxuXHRcdEBpbnB1dC5zdHlsZS5jb2xvciA9IEBjb2xvci50b0hleFN0cmluZygpXG5cdFxuXHRjaGFuZ2VJbnB1dFZhbHVlOiAodikgLT5cblx0XHRAaW5wdXQudmFsdWUgPSB2XG5cdFx0QGlucHV0Lm9uaW5wdXQoKVxuXHRcdFxuXHR3cmFwRmlsZUlucHV0VG9QYXJlbnQ6IC0+XG5cdFx0cmV0dXJuIHVubGVzcyBAaXNGaWxlXG5cdFx0aWYgQC5wYXJlbnRcblx0XHRcdEAud2lkdGggID0gQC5wYXJlbnQuZnJhbWUud2lkdGhcblx0XHRcdEAuaGVpZ2h0ID0gQC5wYXJlbnQuZnJhbWUuaGVpZ2h0XG5cdFx0ZWxzZVxuXHRcdFx0QGlucHV0LnN0eWxlLm9wYWNpdHkgPSAxXG5cdFx0XHRAaW5wdXQuc3R5bGUubGluZUhlaWdodCA9IFwiI3tALmhlaWdodH1weFwiXG5cdFx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBcIiNmZmZcIlxuXHRcdFx0QGlucHV0LnN0eWxlLnRleHRJbmRlbnQgPSBcIjFlbVwiXG5cdFx0XHRALmJhY2tncm91bmRDb2xvciAgPSBcIiNmZmZcIlxuXHRcdFxuXHRcdFxuXHRcdFxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QUQwQkEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQztBQUViLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUVqQixvQkFBQSxHQUF3Qjs7RUFDeEIscUJBQUEsR0FBd0I7O0VBQ3hCLHFCQUFBLEdBQXdCOztFQUV4QixNQUFNLENBQUMsS0FBUCxHQUFrQjs7RUFDbEIsTUFBTSxDQUFDLEtBQVAsR0FBa0I7O0VBQ2xCLE1BQU0sQ0FBQyxJQUFQLEdBQWtCOztFQUNsQixNQUFNLENBQUMsS0FBUCxHQUFrQjs7RUFDbEIsTUFBTSxDQUFDLE9BQVAsR0FBa0I7O0VBQ2xCLE1BQU0sQ0FBQyxLQUFQLEdBQWtCOztFQUNsQixNQUFNLENBQUMsUUFBUCxHQUFrQjs7RUFFbEIsVUFBQyxDQUFB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
