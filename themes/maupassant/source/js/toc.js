$(".toc-icon").click(function() {
  $("#toc").toggle("fast")
  $(".toc-icon").toggleClass("highlight")
});

$("#toc").click(function() {
  $("#toc").hide("fast")
  $(".toc-icon").toggleClass("highlight")
});
