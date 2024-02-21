import React, {useState} from "react";
import useAuthContext from "../../context/hooks";
import {Category} from "../../api/constants/enums";
import {Button, ColumnContainer, Container, ImagePreview, Input, Label, Price, RowContainer, TextArea} from "./styles";
import {createPoster, PosterCreateDto} from "../../api/posters";
import CustomDropDown, {DropDownOptionProps} from "../CustomDropDown";
import ImageUploadForm from "../ImageUploadForm";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const CreatePoster = () => {
    const navigate = useNavigate();
    const {user, jwtTokens} = useAuthContext();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [isSharing, setSharing] = useState<boolean>(false);
    const [isNew, setNew] = useState<boolean>(false);
    const [imageId, setImageId] = useState<string | null>(null);
    const [category, setCategory] = useState<Category>(Category.None);

    const options: DropDownOptionProps[] = Object.keys(Category)
        .filter((key) => isNaN(Number(key)))
        .map((key) => {
            return {
                value: Category[key as keyof typeof Category].toString(),
                label: key
            };
        });


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPoster = {
            title: title,
            description: description,
            price: price,
            isSharing: isSharing,
            isNew: isNew,
            imageId: imageId,
            creatorId: user!.id,
            category: category
        } as PosterCreateDto;

        const result = await createPoster(jwtTokens!.accessToken, newPoster);
        if (result) {
            toast.success("Poster created");
            navigate("/user#myPosters")
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <ColumnContainer>
                <Label>Title</Label>
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    minLength={3}
                />
            </ColumnContainer>


            <ColumnContainer>
                {
                    imageId !== null &&
                    <ImagePreview src={`${process.env.REACT_APP_BASE_URL}/Images/${imageId}.jpg`}/>
                }
                <RowContainer>
                    <ImageUploadForm buttonText="select file" buttonPadding="3px 8px" getImageId={setImageId}/>
                    <Button onClick={(event) => {
                        event.preventDefault();
                        setImageId(null);
                        toast.success("Image removed!");
                    }}>
                        delete image
                    </Button>
                </RowContainer>
            </ColumnContainer>

            <RowContainer>
                <Label>Category</Label>
                <CustomDropDown
                    defaultValue={{value: Category.None.toString(), label: `Without category`}}
                    options={options}
                    onChange={(selectedOption) => {
                        // Convert the selected option's value back to a number, then to the enum
                        const valueAsNumber = Number(selectedOption.value);
                        if (!isNaN(valueAsNumber)) {
                            setCategory(valueAsNumber);
                        }
                    }}
                />
            </RowContainer>

            <ColumnContainer>
                <Label>Description</Label>
                <TextArea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minLength={20}
                    maxLength={20000}
                />
            </ColumnContainer>


            <ColumnContainer>
                <Label>Price</Label>
                <Price
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min={0}
                    max={999999999}
                />
            </ColumnContainer>


            <ColumnContainer>
                <Input
                    type="checkbox"
                    checked={isSharing}
                    onChange={(e) => setSharing(e.target.checked)} // Updates isSharing based on checkbox status
                />
                <Input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setNew(e.target.checked)} // Updates isSharing based on checkbox status
                />
            </ColumnContainer>

            
            


            <button type="submit">123</button>
        </Container>
    );
};

export default CreatePoster;