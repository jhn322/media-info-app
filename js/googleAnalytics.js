// Custom event - search button
document.getElementById("search-btn").addEventListener("click", function () {
  gtag("event", "search_button_click", {
    event_category: "button_click",
    event_label: "Search Button Clicked",
  });
});
