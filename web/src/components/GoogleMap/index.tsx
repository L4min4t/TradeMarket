import {CustomMap} from "./styles";

interface GoogleMapProps {
    location: string;
}


// const GoogleMap = ({location}: GoogleMapProps) => (
//     <CustomMap
//         loading="lazy"
//         src={
//             `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=${location.replace(" ", "+")}`
//         }/>
// );

const GoogleMap = ({location}: GoogleMapProps) => {
    console.log("asdasdasd", process.env.GOOGLE_API_KEY, "|" );
    return <CustomMap
        loading="lazy"
        src={
            `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=${location.replace(" ", "+")}`
        }/>
}


export default GoogleMap;