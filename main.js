document.querySelector(".control span").onclick = function(){
    let yourName = prompt("What's Your Name?");

    // If no Name is specified
    if (yourName == null || yourName == ""){
        document.querySelector(".info-container .name span").innerHTML = "Unknown";
    }
    // If Name is specified
    else {
        document.querySelector(".info-container .name span").innerHTML = yourName;
    }
    // Remove Splash screen
    document.querySelector(".control").remove();
};
// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array of Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range of Keys
// let orderRange = [...Array(blocks.length).keys()]; // Way to do this
let orderRange = Array.from(Array(blocks.length).keys()); // Another way to do this

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order css property to Game Blocks
blocks.forEach((block , index) => {
    block.style.order = orderRange[index];

    // Add Click Event

    block.addEventListener('click',function() {
        // Trigger flipBlock Function
        flipBlock(block);
    });
});

// Flip Block Function

function flipBlock(selectedBlock){
    // Add Class is-flipped to the Selected Block
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Blocks
    let AllFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // console.log(AllFlippedBlocks);

    // If Selected Two Blocks
    if(AllFlippedBlocks.length === 2){

        // console.log('You have two selected blocks');

        // Stop Clicking Function 
        stopClicking();

        // Check Matching Function
        checkMatching(AllFlippedBlocks[0], AllFlippedBlocks[1]);
    }
};

// Check Matching Function
function checkMatching(firstBlock, secondBlock){
    let triesFail = document.querySelector('.tries span');

    // If Two Blocks are Matched
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        // Remove is flipped Class
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        // Add new Class
        firstBlock.classList.add('is-match');
        secondBlock.classList.add('is-match');
        document.getElementById('success').play();
    }
    else{
        triesFail.innerHTML = parseInt(triesFail.innerHTML)+1;
        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration);
        document.getElementById('fail').play();
    }

}


// Stop Clicking Function
function stopClicking() {
    // Add Class no-clicking
    blocksContainer.classList.add('no-clicking');
    
    // After Duration Time Make me Click Again
    setTimeout(() => {
        // Remove Class no-clicking
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Shuffle Function
function shuffle(array){
    // Setting Vars
    let current = array.length,temp,random;

    while(current>0){
        // Get random Number
        random = Math.floor(Math.random() *current);

        // Decrease length by one
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        //[2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Stash Element
        array[random] = temp;
    }

    return array;
}