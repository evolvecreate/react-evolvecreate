import React, { Component } from 'react';
import highlighter from '../icon_highlighter.png';
import energyPyramid from '../energy-pyramid.jpg';

class Annotations extends Component {

  componentDidMount() {

      window.annotations.init(); // TODO: use $element to keep scope
  }




  render() {

      const annotationsUrl = 'https://www.rocketlit.com/explore/features/annotations-and-highlighting.php';

      return (
          <div id="panel_annotations">

              <input type="hidden" id="hidden_annotationDemo" name="annotationDemo" value="t" />

              <div className="annotator">
                  <ul className="annotation-list"></ul>
                  <div className="clear"></div>
              </div>

              <div className="annotation-options">
                  <button type="button" className="toggle-options button5 shadow button_toggleAnnotationOption"><img src={highlighter} alt="highlighter icon" width="24" height="24" /></button>
                  <button type="button" className="annotation-option button6 shadow button_highlight-green"><span style={{'backgroundColor':'#43ff40', 'padding':'0px 2px','color':'#222233'}}>hi</span></button>
                  <button type="button" className="annotation-option button6 shadow button_highlight-pink"><span style={{'backgroundColor':'#ff9797', 'padding':'0px 2px', 'color': '#222233'}}>hi</span></button>
                  <button type="button" className="annotation-option button6 shadow button_circle"><span style={{'color':'#ff0000'}}>O</span></button>
                  <button type="button" className="annotation-option button6 shadow button_box"><span style={{'color':'#a900ff'}}>[ ]</span></button>
                  <button type="button" className="annotation-option button6 shadow button_underline"><span style={{'borderBottom':'2px solid #0088ff'}}>U</span></button>
                  <div className="clear"></div>
              </div>

              <div className="contentBox-grape"><div className="content-width verticalPadding">
                  <h1 className="white">Letting Students Annotate</h1>
                  <h3 className="silver">All Assignments can be Highlighted and Annotated for Future Reference</h3>
              </div></div>

              <div className="contentBox-periwinkle"><div className="content-width verticalPadding">

                  <div className="articleHeader">

                      <div className="float" style={{'margin-right': '20px'}}>
                        <img src={energyPyramid} alt="RocketLit article cover for the Energy Pyramid" />
                      </div>
                      <div className="float">
                          <h1>Energy Pyramid</h1>
                          <div className="vocabularyWords">producers, energy pyramid, consumer, energy loss</div>
                          <div className="unitTitle">Ecology Unit</div>
                      </div>

                      <div className="clear"></div>

                  </div>



                  <img className="float" src={highlighter} alt="highlighter icon" width="28" height="28" />
                  <ul id="list_annotation-markers" className="float"></ul>

                  <div className="clear"></div>



                  <div className="articleBody">
                      <p>Did you know that you're sitting on top of a pyramid?  That's the shape with four triangle sides and a square bottom
                          like the ones you could find in Egypt.  The top is very pointy.  Sounds uncomfortable, right?  Well, being at the top
                          of a pyramid is just where you want to be.  Not only do you get the best view, but the rest of the pyramid has to
                          work to hold you up.  Oh, did I tell you that this pyramid is made of all the living organisms on the planet?
                          No, this isn't a circus act.  Let me explain...</p>
                  </div>

                  <div className="verticalPadding">
                      <a href={annotationsUrl} target="_blank" rel="noopener noreferrer">Learn More about Annotations</a>
                  </div>

              </div></div>

          </div>

      )
  }


}


export default Annotations;