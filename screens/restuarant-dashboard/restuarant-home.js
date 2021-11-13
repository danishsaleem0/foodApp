import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Fab from '@mui/material/Fab';
import { doc, db, setDoc,collection, storage,ref , getDownloadURL, uploadBytes , addDoc} from '../../config/firebase';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { GlobalContext } from '../../context/context';
import TextField from '@mui/material/TextField';;


const categories = [
    {
        value: 'Chinese',
        label: 'Chinese',
    },
    {
        value: 'Fast Food',
        label: 'Fast Food',
    },
    {
        value: 'BBQ',
        label: 'BBQ',
    },
    {
        value: 'Pakistani',
        label: 'Pakistani',
    },
];

const items = [

    {
        value: 'Manchurian.',
        label: 'Manchurian.',
    },

    {
        value: 'Chow mein.',
        label: 'Chow mein.',
    },

    {
        value: 'Wonton.',
        label: 'Wonton.',
    },
    {
        value: 'Chilli Chicken.',
        label: 'Chilli Chicken.',
    },
]

const items2 = [
    {
        value: 'Zinger Burger.',
        label: 'Zinger Burger.',
    },

    {
        value: 'Broast.',
        label: 'Broast.',
    },

    {
        value: 'Club Sandwhich.',
        label: 'Club Sandwhich.',
    },

    {
        value: 'Wimpy Roll.',
        label: 'Wimpy Roll.',
    },
]

const items3 = [

    {
        value: 'Kabab Fry.',
        label: 'Kabab Fry.',
    },

    {
        value: 'Chicken Tikka.',
        label: 'Chicken Tikka.',
    },

    {
        value: 'Malai Boti.',
        label: 'Malai Boti.',
    },
    {
        value: 'Seekh Kabab',
        label: 'Seekh kabab',
    },
]


const items4 = [
    {
        value: 'Chicken Karhai.',
        label: 'Chicken Karhai.',
    },

    {
        value: 'Mutton Karhai.',
        label: 'Mutton Boti.',
    },
    {
        value: 'Chicken Handi.',
        label: 'Chicken Handi.',
    },
    {
        value: 'Fried Qeema.',
        label: 'Fried Qeema.',
    },

]

const deliveryType = [
    {
        value: 'Paid',
        label: 'Paid'
    },

    {
        value: 'Free',
        label: 'Free'
    }

]

function ResHome() {
    
    const { state } = useContext(GlobalContext)
    const [category, setCategory] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [delivery, setDelivery] = useState('');
    const [ file, setFile ] = useState('')



    function uploadImageToStorageL() {
           return new Promise( async(resolve,reject) => {
            const imagesRef = ref(storage, `dish-picture/${state.authUser.UID}${file.name}`);
            await  uploadBytes(imagesRef, file)
            let url = await  getDownloadURL(imagesRef)
            resolve(url)
           })
        
      }
    
    

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleChange2 = (event) => {
        setItem(event.target.value);
    };

    const handleChange3 = (event) => {
        setPrice(event.target.value);
    };

    const handleChange4 = (event) => {
        setDelivery(event.target.value);
    };

    const addBtn = async() => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":"  + ' ' +  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
       
       let imageURL = await uploadImageToStorageL( state.authUser.UID) 

    //     let foodRef = doc(db, 'food-item-menu')
    //        await setDoc(foodRef, {
            // restuarantName: state.authUser.restuarantName, 
            // time: time,  
            // foodCategory: category,
            // dishItem: item,
            // dishPrice: 'Rs' + price,
            // deliveryType: delivery,
            // dishPicture:  imageURL,
            // UID: state.authUser.UID
    //        })
    //        alert('Your Dish successfully Publish')

    let foodRef = collection(db, 'food-item-menu')
    await addDoc(foodRef, {
        restuarantName: state.authUser.restuarantName, 
        time: time,  
        foodCategory: category,
        dishItem: item,
        dishPrice: 'Rs' + price,
        deliveryType: delivery,
        dishPicture:  imageURL,
        UID: state.authUser.UID
    })
    alert('Your Dish successfully Publish')

    
     }

    return (     
          <>
        <CssBaseline />
        <Container maxWidth="sm"   >
            <Box sx={{ bgcolor: '#F8F8FF', height: '66vh' }} style={{ textAlign: 'center', position: 'relative', top: '20px' }}  >
                <Typography variant="h3">Add Dishes</Typography>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>

                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select Category"
                            value={category}
                            onChange={handleChange}
                            helperText="Please select your Category"
                            variant="filled"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>


                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Select Dish Item"
                            value={item}
                            onChange={handleChange2}
                            helperText="Please select your Item Name"
                            variant="filled"
                        >
                            {
                                category === 'Chinese' ? items.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>)) : null

                            }

                            {
                                category === 'Fast Food' ? items2.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>)) : null

                            }

                            {
                                category === 'BBQ' ? items3.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>)) : null

                            }

                            {
                                category === 'Pakistani' ? items4.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>)) : null

                            }
                        </TextField>
                    </div>

                    <div>
                        <TextField
                            id="filled-select-currency"
                            label="Select Price"
                            value={price}
                            onChange={handleChange3}
                            helperText="Please select your Price"
                            variant="filled"
                        >
                        </TextField>

                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Select Delivery Type"
                            value={delivery}
                            onChange={handleChange4}
                            helperText="Please select your Delivery Type"
                            variant="filled"
                        >
                            {deliveryType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-around' }} >

                        <label htmlFor='upload-picture' >
                            <TextField
                                style={{ display: 'none' }}
                                id='upload-picture'
                                name='upload-picture'
                                type='file'
                                variant="standard"
                                onChange={(e)=>{ setFile(e.target.files[0])}}
                            >
                            </TextField>
                            <Button size='small' color="info" variant="contained" component="span">
                                <Icon color="default" style={{ marginRight: '6px', marginBottom: '3px' }} > add_circle </Icon>
                                Upload Photo
                            </Button>
                        </label>



                        <Fab variant="extended" size='medium' onClick={addBtn} >
                            

                            <Icon color="primary" style={{ marginRight: '6px', marginBottom: '3px' }} >add_circle</Icon>
                            Submit Item
                        </Fab>
                    </div>


                
                </Box>
            </Box>
           
        </Container>

         <div style={{backgroundColor: '#5D6D7E',  width: '100%' , height: '190px', position: 'relative', top: '70px', display: 'flex', justifyContent: 'space-around'}}  >

            < div  style={{width:'20%' }}  >
              <h2 >Company Name</h2>
              <p style={{ color: 'white', fontSize: '13px'}} >Foodyn the brand that values honesty which brings reliability,that offers the quality products made from particular raw
               material with a lot of time and effort spent and that provides the culture to enjoy eating occasions.</p>
              </div>

            <div style={{width:'20%'}} >
                <h2> Links </h2>
                <p> <a style={{ color: 'white'}}  href='#' > Your Account</a> </p>
              <p> <a style={{ color: 'white'}}  href='#' > Registration Charges</a> </p>
              <p> <a style={{color: 'white'}}  href='#' > Help</a> </p>
            </div>  

            <div style={{width:'30%' }}  >
                
              <h2 >Contact</h2>
              <p> <a style={{textDecoration: 'none', color: 'white'}}  href='#' > 48th Street, Badar Commercial</a> </p>
              <p> <a style={{textDecoration: 'none', color: 'white'}}  href='#' > Phone No. 03212216415</a> </p>
              <p> <a style={{textDecoration: 'none', color: 'white'}}  href='#' > Mail: danishsaleem909@gmail.com</a> </p>
                </div>

        </div>



    
        

</>)
}
export default ResHome