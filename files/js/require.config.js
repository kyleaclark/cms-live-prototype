var require = {

  baseUrl: "/",
  
  paths: {
    jquery: "lib/bower/jquery/jquery"
  }

};

// Disable cache
require.urlArgs = "time=" + new Date().getTime();