var Template = (function(){
  var Template = function(){

  }
  Template.Apply = function(jquery, data){
    jquery.find('[data-bind]').each(function(index,element){
      var $this = $(element),
          bind_string = $this.data('bind'),
          bind_object = Template.ParseBindObject(bind_string);
          $.each(bind_object,function(key,bind){
            var func = Method[key];
            if(func) func($this);
          })
    })
  }
  Template.ParseBindObject=function(bindText) {
    if (!bindText) return {};
    var depth = 0,
        key = "",
        value = [],
        rtnObject = {},
        single_quote = "'(?:[^'\\\\]|\\\\.)*'",
        double_quote = '"(?:[^"\\\\]|\\\\.)*"',
        specials = ',"\'{}()/:[\\]',
        others = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']',
        oneNotSpace = '[^\\s]',
        bindingToken = RegExp(single_quote + '|' + double_quote + '|' + others + '|' + oneNotSpace, 'g'),
        array = bindText.match(bindingToken);
    array.push(",");
    for (var i = 0, ele; ele = array[i]; ++i) {
        var char = ele.charAt(0);
        if (char === "," && depth <= 0) {
            if (key) rtnObject[key] = value.join("");
            key = "", value = [], depth = 0;
            continue;
        } else if (char === ":") {
            if (!value.length) continue;
        } else if (char === "{" || char === "[" || char === "(") {
            depth++;
        } else if (char === "}" || char === "]" || char === ")") {
            depth--;
        } else if (!key && !value.length) {
            key = ele;
            continue;
        }
        value.push(ele);
    }
    return rtnObject;
}
  return Template;
})();

var Method = (function(){
  var Method = function(){
  }
  Method.foreach = function(){
    console.log('foreach');
  }
  Method.text = function(jquery){

  }
  return Method;
})();
