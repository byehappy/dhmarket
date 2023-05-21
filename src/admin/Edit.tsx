import React from 'react';
import {
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    SimpleFormIterator,
    TextInput,
    ArrayInput,
    required,
    useNotify,
    useRedirect,
} from 'react-admin';

export const ProductEdit = (props:any) => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data:any) => {
        notify('Product updated successfully');
        redirect('list', 'products', data.id, data);
    };

    return (
        <Edit mutationOptions={{ onSuccess }} {...props}>
            <SimpleForm>
                <TextInput disabled source="id" label="ID" />
                <TextInput validate={[required()]} source="name" label="Name" />
                <TextInput source="description" label="Description" />
                <NumberInput validate={[required()]} source="price" label="Price" />
                <ReferenceInput
                    validate={[required()]}
                    source="category_id"
                    reference="categories"
                    label="Category"
                >
                    <SelectInput optionText="category_name" />
                </ReferenceInput>
                <TextInput source="image_url" label="Image URL" />
                <NumberInput validate={[required()]} source="quantity_in_stock" label="Quantity in Stock" />
                <ArrayInput validate={[required()]} source="attributes">
                    <SimpleFormIterator>
                        <TextInput source="name_attribute" label="Attribute Name" />
                        <TextInput source="value" label="Value" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
};
