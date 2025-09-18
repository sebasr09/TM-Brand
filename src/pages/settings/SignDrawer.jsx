import React from 'react';
import { Stack, Button, Typography, Grid, IconButton } from '@mui/material';
import { Stage, Layer, Line } from 'react-konva';
import { useState, useRef, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useScrollBlock from '../../constants/useScrollBlock';

const SignDrawer = ({ accion }) => {

  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [blockScroll, allowScroll] = useScrollBlock();

  const div = useCallback(node => {
    function updateSize() {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseDown = (e) => {
    blockScroll()
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };


  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // To draw line
    let lastLine = lines[lines.length - 1];

    if (lastLine) {
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    allowScroll()
  };
  return (
    <Grid container width='100%' columnSpacing={{ lg: 8, xs: 0 }}>
      <Grid item xs={12}>
        <Typography variant={'h6'} sx={{ m: '0 0.5em', fontFamily: "Montserrat Bold", textAlign: 'left' }}>
          Firma aquí
        </Typography>
      </Grid>
      <Grid item xs={12} lg={7}>
        <div id="App drawing-area" ref={div} style={{
          width: { xs: '238px', sm: '305px', lg: '405px' },
          height: '140px',
          padding: '2px',
          backgroundColor: 'white',
          border: '2px solid lightgray',
          borderRadius: '20px',
          margin: '1em 0'
        }}>
          <div className=" text-center text-dark">
            <Stage
              width={width - 25}
              height={height - 10}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              className="canvas-stage"
              ref={stageRef}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#fffff"
                    strokeWidth={1.5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Stack >
          <Button color='primary'
            sx={{ fontFamily: "Montserrat Bold", fontSize: 'medium', m: '1em 1.5em', borderRadius: '18px', p: '0.5em 0' }}
            variant='contained'
            onClick={async () => { accion(await stageRef.current.toDataURL(), lines) }}>Enviar</Button>
          <IconButton
            onClick={() => {
              setLines([])
            }}
            sx={{ m: '0.5em auto', p: '0.5em 0', bgcolor: theme => theme.palette.primary.main, height: '45px', width: '45px' }}
            color='lightgray'
            size="large">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      </Grid>

    </Grid>
  )
};

SignDrawer.propTypes = {
  accion: PropTypes.func
}

export default SignDrawer;