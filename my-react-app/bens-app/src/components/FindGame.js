import { useEffect, useState, useRef } from 'react';
import './../FindGame.css';

// as the starting state is static - they never change - we can happily define them outside of the component

const blocksStart = {
  'red'    : false,
  'blue'   : false,
  'yellow' : false,
  'green'  : false,
}

const FindGame = () => {

  // by keeping our timers in a useRef variable, they both survive re-renders and they can be accessed (to clear them) anywhere in our code
  const timer = useRef();
  const halter = useRef();

  // assign the winning block, and store it in a useRef so it survives re-renders (you don't want the prize to move as you play!)
  const prize = useRef(Object.keys(blocksStart)[Math.floor(Math.random() * Object.keys(blocksStart).length)]);

  // set the initial state for the blocks by simply copying in the "starting state" from above
  const [ blocks, setBlocks ] = useState(blocksStart);

  // we need to keep a track of the time left, so we can both timeout the game and show it on the UI (so the user knows how long is left)
  const [ secsLeft, setSecsLeft ] = useState(5);

  // we need to be able to tell the UI where we are in the game - are we playing, or have we making the user wait before they can guess again, or have they won, or indeed have they lost !
  // note: while you could also think that if secsLeft === 0 then the game is over - and that is a reasonable assumption - but it is much better to have explicit states rather than implicit
  // and you don't want to have to do logic like "if the status is play but we've run out of time ...".  Let the timer keep track of the time, and let the status keep track of the .. status!
  const [ status, setStatus ] = useState('play');  // play | halt | lost | won

  // what shall we do when we click a block ?  well we can always ignore it, IF the state is such.
  // if we don't ignore it, we just update the block state to indicate that we've tried this block.
  // then we also check to see if we've just won, or guessed wrong - either way we need to change the status of the game to capture that in our state
  const onClickBlock = (colour) => {
    if (status !== 'play') return;   // if we're not in play mode, ignore click
    if (blocks[colour]) return;      // if we've already tried this block, ignore click
    setBlocks((blocks) => {
      // the next line is a neat way of returning the blocks object as it already is (using ...spread), but modifying one part of it as we do so
      // it also ensures we return a NEW object containing the blocks data, and not just a copy of the blocks object
      // by setting blocks to a new object like this, we ensure that the useEffect that depends on 'blocks' changing will fire (otherwise it can't tell that blocks has actually changed, unfortunately)
      // to understand more, google "javascript objects passed by reference not by value" (we have talked about this, but not in detail)
      return {
        ...blocks,
        [colour] : true,
      };
    });
    if (colour === prize.current) { 
      clearInterval(timer.current);
      setStatus('won');
    } else {
      setStatus('halt'); 
    }
  }

  // now for our side effects - the first one is our 'mount' effect - i.e. the dependency list is an empty array.
  // as soon as we've mounted, we want to start the game - i.e. get the timer running.
  // and of course, as the timer runs down, we need to check when it runs out of time and set the game status to 'lost'.
  // note the return function which is the clear-up. We are good citizens are we remove the timer and the 'halter' too, just in case its running at the same time.
  useEffect(() => {
    timer.current = setInterval(() => {
      setSecsLeft((secsLeft) => {
        const newSecsLeft = secsLeft - 1;
        if (newSecsLeft <= 0) {
          // we have timed out, set indicator in state
          setStatus('lost');
          clearInterval(timer.current);
        }
        return newSecsLeft;
      });
    }, 1000);
    return (() => {
      clearInterval(timer.current);
      clearTimeout(halter.current);
    });
  }, []);

  // one more side effect to deal with - when the status changes. We need to check if the status has been changed to 'halt' - and if so, halt the game for 1 second (using a timeout)
  // again, not the return function to clear up the timer just in case its still running when we unmount.
  useEffect(() => {
    if (status === 'halt') {
      halter.current = setTimeout(() => {
        setStatus('play');
      },1000);  
      return () => clearTimeout(halter.current);
    }  
  }, [ status ]);  

  // now its time to convert all our state into our UI !
  // remember: UI is a function of props + state.
  // in this component, we have no props, so our UI is just a function of state
  // so .. we have some fixed html being generated, and then lots of bits of state logic to generate the html that shows the state we're in.
  // ideally we'd like to use a switch statement for the status being 'halt' or 'lost' or 'won', but as it can only ever be one value at any given time,
  // its ok to just stack up the if's as per below.
  // remember that you can't do an actual "if" in JSX, but you can either do an if like this:
  // {check-this-condition && (render-this-html-if-true) }
  // or you can do an if/else using a ternary like this:
  // {check-this-condition ? (render-this-html-if-true) : (render-this-html-if-false) }
  // if you really really (really) want to do a switch, or more complex logic checking, then you can do an IIFE - but they are best avoided to be honest
  // I have put a dummy one in the html for you to see, but the bracket combinations aren't exactly pleasant !
  // {(() => { 
  //   whatever code you want here, literally any JS you like
  //   if your code is going to generate some html, it just has to return () it and it will be added to the page
  // })()}
  return (
    <div style={{ margin: '20px' }}>
      <h1>FIND GAME !</h1>
      <h3>Instructions</h3>
      <p>One of these blocks has the prize in it</p>
      <p>Can you click the right one and win the prize??</p>
      <p>Click the wrong box and you have to wait 1 second before you can try again!</p>
      <br />
      <p>You have only {secsLeft} seconds left to find the right one!!</p>
      <br />
      <div className="blocks">
        {Object.entries(blocks).map(([ colour, chosen ]) => {
          // we need to use CSS classes to change what the block shows depending on whether its:
          // - a block waiting to be clicked
          // - a block already clicked - and wrong
          // - a block clicked - and the winning block
          // I've done it here using a string literal - i.e. backticks - with an imbedded double-ternary. ouch! not the nicest code, but it gets the job done.
          // often you have multiple classes being switched on and off like this, and it can get real messy.
          // this is why these npm packages were invented, check them out: 'classnames', 'clsx'
          // note also the 'cheat' of using the in-line style property to set the background color of the block.
          // I'm taking advantage here of the fact that all blocks are named by a valid CSS colour - so no need for the CSS file to provide it.
          // there's nothing bad about using both className= and style= like this, but CSS (and especially SCSS) is the first place where styling should go - 'separation of concerns'
          const classes = `block ${chosen ? prize.current === colour ? 'winner' : 'wrong' : ''}`;
          return (
            <div key={colour} style={{ backgroundColor: colour }} className={classes} onClick={() => onClickBlock(colour)} />
          );
        })}
      </div>
      {/*
         some more stacked if's here, which again is fine as status can only ever be one of the values at any time.
         I actually could have used an IIFE + switch here, and it would have been quite neat code.
         you could always try to convert it into one yourself ...
      */}
      <div className={`announcement ${status}`}>
        {status === 'halt' && (
          <span>YOU'VE GOTTA WAIT !!!</span>
        )}
        {status === 'lost' && (
          <span>OUTTA TIME!! HARD LUCK, REFRESH TO TRY AGAIN</span>
        )}
        {status === 'won' && (
          <span>YEY - YOU HAVE WON THE PRIZE !!</span>
        )}
      </div>
      {(()=> {
        console.log('Im an IIFE within the html, look at the console and see me!');
      })()}
    </div>
  )
}

export default FindGame;
