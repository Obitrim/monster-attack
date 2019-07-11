$("document").ready(function(){
  
    let playerHealth = 100;
    let monsterHealth = 100;
    let gifts = {
        specialAttack: 2
    }

    reset();

    /**
     * 
     * start game when start button is clicked
     */
    $(".btn:nth-child(3)").click( function(){

        gifts.specialAttack = 2;
        startGame(this);
    });



    /**
     * 
     * regular attack
     */
    $(".btn-attack").click( function(){

        let playerAttack = Math.max(5, Math.floor(Math.random() * 10) + 1);
        let monsterAttack = Math.max(5, Math.floor(Math.random() * 10));

        attack(playerAttack, monsterAttack);
    });


    /**
     * 
     * special attack
     */
    $(".btn-special-attack").click( function(){

        gifts.specialAttack--;

        if( gifts.specialAttack === 0){
            $(".btn:nth-child(2)").attr("disabled", true);
        }

        let playerAttack = Math.max( 5, Math.floor(Math.random() * 10) + 3);
        let monsterAttack = Math.max( 4, Math.floor(Math.random() * 10));

        attack(playerAttack, monsterAttack);
    });


    /**
     * heal button
     */
    $(".btn-heal").click(function(){
        $(this).attr("disabled", true);
        heal();
    });



    /**
     * 
     * button stop operation
     */
    $(".btn.btn-stop").click( function(){

        playerHealth = 0;
        monsterHealth = 0;
        
        updateHealth( playerHealth, monsterHealth );
        gifts.specialAttack = 2;

        $(".btn").each(function(index, element){
            $(element).attr("disabled", false);
        });

        $(".logs").empty();
        reset();
    });



    /**
     * start game
     * 
     * @param { Object } obj 
     */

    function startGame( obj ){

        //show all play buttons
        $(".btn").each(function () {
            $(this).show();
        });

        $(obj).hide();
        updateHealth(100, 100);
    }



    /**
     * healing
     *
     */

    function heal() {

        playerHealth += 5;

        if( playerHealth > 100 ){
            playerHealth = 100;
        }

        //monster attacking while player heals
        let monsterAttack = Math.max(3, Math.floor(Math.random() * 10) - 2)
        playerHealth -= monsterAttack;

    }



    /**
     * 
     * resetting play buttons
     */ 
    function reset(){

        $(".btn").each(function(){
            $(this).hide();
        });

        $(".btn:nth-child(3)").show();
    }
   


    /**
     * #Performs an attack
     * 
     * @param { Number } playerAttack 
     * @param { Number } monsterAttack 
     */
    function attack( playerAttack, monsterAttack ){
        
        logAttack( playerAttack, monsterAttack );

        playerHealth -= monsterAttack;
        monsterHealth -= playerAttack;

        // check win
        if(playerHealth <= 0){

            alert("Monster wins");

            //disable all except stop butotn to prevent further play
            preventPlayMode();

            updateHealth(0, monsterHealth);
            return;
        } 
        
        if(monsterHealth <= 0){

            alert("Player wins");

            //disable all except stop butotn to prevent further play
            preventPlayMode();

            updateHealth(playerHealth, 0);
            return;

        } 

        updateHealth(playerHealth, monsterHealth);

    }


    /**
     * Function Logs attacks
     * 
     * @param { Number } playerHit 
     * @param { Number } monsterHit 
     */
    function logAttack( playerHit, monsterHit ){

        
        $(".logs").prepend(

            `<li class="player-log"> Player hits monster by ${ playerHit } </li>
            <li class="monster-log"> Monster hits player by ${ monsterHit } </li>
            `
        );
    }



    /**
     * disabling all buttons to stop further play
     */
    function preventPlayMode(){

        $(".btn").each(function(index, element){
            $(element).attr("disabled", true);
        });

        $(".btn-stop").attr("disabled", false);

    }



    /**
     * #updates player's  and monster's health
     * 
     * @param { Number } newPlayerHealth 
     * @param { Number } newMonsterHealth 
     */
    function updateHealth( newPlayerHealth, newMonsterHealth ){
        
        playerHealth = newPlayerHealth;
        monsterHealth = newMonsterHealth;

        $(".player-health").css("width", `${playerHealth}%`);
        $(".monster-health").css("width", `${monsterHealth}%`);
    }


});