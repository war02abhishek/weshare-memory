import React,{useState,useEffect} from 'react'
import { Container, Grow, Grid,Paper,AppBar,TextField,Button } from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

// import Pagination from '../Pagination'
// import { useNavigate,useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input'

// function useQuery(){
//   return new URLSearchParams(useLocation().search);
// }

const Home=()=>{
    const [currentId, setCurrentId] = useState(0);
      const dispatch = useDispatch();
    // const query=useQuery();
    // const navigate=useNavigate();

    // const page=query.get('page')||1;
    // const searchQuery=query.get('searchQuery');

      console.log("hi i am home");

      useEffect(() => {
        dispatch(getPosts());
      }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid
        //   className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Paper  elevation={6}>
             {/* <Pagination/> */}
          </Paper>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home