const sessionUIControl = (function() {

})()

const sessionControl = (function(){
   return {
      startNewSession: function(user) {
         console.log(`A new session has been started for ${user.name}`);
      }
   }
})()
