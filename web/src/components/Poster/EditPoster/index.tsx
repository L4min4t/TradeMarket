import {useNavigate} from "react-router-dom";
import useAuthContext from "../../../context/hooks";
import React, {useState} from "react";
import {Category} from "../../../api/constants/enums";
import CustomDropDown, {DropDownOptionProps} from "../../CustomDropDown";
import {toast} from "react-toastify";
import {createPoster, PosterCreateDto, PosterDto} from "../../../api/posters";
import {
    Button,
    CategoryContainer,
    CheckBox,
    ColumnContainer,
    Container,
    ImagePreview,
    Input,
    Label,
    Price,
    RowContainer,
    SubmitButton,
    TextArea
} from "../CreatePoster/styles";
import ImageUploadForm from "../../ImageUploadForm";

interface EditPosterProps {
    poster: PosterDto;
}

const EditPoster = ({poster}: EditPosterProps) => {
    const navigate = useNavigate();
    const {user, jwtTokens} = useAuthContext();
    const [title, setTitle] = useState<string>(poster.title);
    const [description, setDescription] = useState<string>(poster.description);
    const [price, setPrice] = useState<number>(poster.price);
    const [isSharing, setSharing] = useState<boolean>(poster.isSharing);
    const [isNew, setNew] = useState<boolean>(poster.isNew);
    const [imageId, setImageId] = useState<string | null>(poster.imageId);
    const [category, setCategory] = useState<Category>(poster.category);


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

        if (title.length < 4 || title.length > 255) {
            toast.error("Title must be between 3 and 100 characters.");
            return;
        }

        if (description.length < 20 || description.length > 20000) {
            toast.error("Description must be between 20 and 20,000 characters.");
            return;
        }

        if (price < 0 || price > 999999999) {
            toast.error("Price must be between 0 and 999999999.");
            return;
        }

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
        if (result !== null) {
            toast.success("Poster created");
            navigate("/user#myPosters")
        } else {
            toast.error("Error occurred.");
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <ColumnContainer>
                <Label>Title:</Label>
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </ColumnContainer>

            <ColumnContainer>
                {
                    imageId !== null &&
                    <ImagePreview src={`${process.env.REACT_APP_BASE_URL}/Images/${imageId}.jpg`}/>
                }
                <RowContainer>
                    <ImageUploadForm buttonText="set image" buttonPadding="3px 8px" getImageId={setImageId}/>
                    <Button onClick={(event) => {
                        event.preventDefault();
                        if (imageId) {
                            setImageId(null);
                            toast.success("Image removed!");
                        }
                    }}>
                        delete image
                    </Button>
                </RowContainer>
            </ColumnContainer>

            <RowContainer>
                <Label>Category</Label>
                <CategoryContainer>
                    <CustomDropDown
                        defaultValue={{value: Category.None.toString(), label: `Without category`}}
                        options={options}
                        onChange={(selectedOption) => {
                            const valueAsNumber = Number(selectedOption.value);
                            if (!isNaN(valueAsNumber)) {
                                setCategory(valueAsNumber);
                            }
                        }}
                    />
                </CategoryContainer>
            </RowContainer>

            <ColumnContainer>
                <Label>Description:</Label>
                <TextArea
                    placeholder="Description (min 20 chars, max 20 000 chars)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </ColumnContainer>

            <RowContainer>
                <Label>Price:</Label>
                <Price
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </RowContainer>

            <ColumnContainer>
                <RowContainer>
                    <Label>Trade:</Label>
                    <CheckBox
                        type="checkbox"
                        checked={isSharing}
                        onChange={(e) => setSharing(e.target.checked)} // Updates isSharing based on checkbox status
                    /> <p>{isSharing ? "for trade" : "not for trade"}</p>
                </RowContainer>

                <RowContainer>
                    <Label>State:</Label>
                    <CheckBox
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setNew(e.target.checked)} // Updates isSharing based on checkbox status
                    /> <p>{isNew ? "new" : "used"}</p>
                </RowContainer>
            </ColumnContainer>

            <SubmitButton type="submit">create</SubmitButton>
        </Container>
    );
}

export default EditPoster;