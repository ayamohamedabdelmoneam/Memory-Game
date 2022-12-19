document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What Is Your Name ?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';


    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

// Remove Splash Screen 
    document.querySelector(".control-buttons").remove();
};

//make duration fleb
let duration = 1000;
// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create Array From Game Block
let blocks = Array.from(blocksContainer.children);
// Creat Range of Key
//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
console.log(orderRange);
Shuffle(orderRange);
console.log(orderRange);
// Add Order css property to game blocks 
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    // Add Click Event
    block.addEventListener('click', function() {
        //Trigger Flip Block Function 
        flipBlock(block);
    })

});
// Flip Block Function 
function flipBlock(selectedBlock) {
    // Add Class Is-flipped
    selectedBlock.classList.add('is-flipped');
    // Collect All Flipped Cards 
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    // If Theres Two Selected Blocks 
    if (allFlippedBlocks.length === 2) {
        //Stop Clicking Function
        stopClicking();
        //Check Matched Blocks
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop Clicking Function 
function stopClicking() {
    //Add Class No Clicking on Main Container 
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        //Remove Class no Clicking After The Duration 
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}
// Check Matched Block Function 
function checkMatchedBlock(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');
        document.getElementById('success').play();
    }else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
       setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
       }, duration);
       document.getElementById('fail').play();
    }
}




// Shuffle Function 
function Shuffle (array) {
    // Setting Vars 
    let current = array.length,
    temp,
    random;
    while (current > 0) {
        //Get Random Number 
        random = Math.floor(Math.random()*current);
        // Decrease 
        current--;
        //Save curr ele in stash 
        temp =array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}