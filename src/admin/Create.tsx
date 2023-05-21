import React from 'react';
import {
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    SimpleFormIterator,
    TextInput,
    ArrayInput,required,useNotify,useRedirect
} from 'react-admin';

export const ProductCreate = (props:any) => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data:any) => {
        notify(`Product created successfully`);
        redirect('list', 'products', data.id, data);
    };
    return(
        <Create mutationOptions={{ onSuccess }} {...props}>
            <SimpleForm>
                <TextInput validate={[required()]} source="name" label="Name"/>
                <TextInput source="description" label="Description"/>
                <NumberInput validate={[required()]} source="price" label="Price"/>
                <ReferenceInput validate={[required()]} source="category_id" reference="categories" label="Category">
                    <SelectInput optionText="category_name"/>
                </ReferenceInput>
                <TextInput source="image_url" label="Image url"/>
                <NumberInput validate={[required()]} source="quantity_in_stock" label="Quantity in Stock"/>
                <ArrayInput validate={[required()]} source="attributes">
                    <SimpleFormIterator inline>
                        <TextInput source="name_attribute" label="attributes Name"/>
                        <TextInput source="value" label="Value"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
}
