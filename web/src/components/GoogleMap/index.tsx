import {CustomMap} from "./styles";

interface GoogleMapProps {
    location: string;
}


const GoogleMap = ({location}: GoogleMapProps) => {
    const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyCCd1ZemJx8YAYpgbxnYfoz6X3fAdf4Rcc";
    const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location.replace(" ", "+")}`;
    return <CustomMap
        loading="lazy"
        src={url}/>;
}

export default GoogleMap;