import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions'; // Import the MentionsInput and Mention components
import { Tag } from 'react-tag-autocomplete'; // Import the Tag type
import './NotificationForm.css';

interface FormValues {
  name: string;
  description: string;
  templateBody: string;
  tags: Tag[]; // Add a tags field to store the selected tags
}

interface Props {
  onChange: (formData: FormValues) => void;
}

const NotificationForm: React.FC<Props> = ({ onChange }) => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    description: '',
    templateBody: '',
    tags: [], // Initialize tags as an empty array
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onChange(newData); // Notify changes to the parent
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log(formData); // Replace with your actual form submission logic
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant='h5'>Add/Edit Notification</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Notification Name'
          variant='outlined'
          fullWidth
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          required
        />
        <TextField
          label='Description'
          variant='outlined'
          fullWidth
          name='description'
          value={formData.description}
          onChange={handleChange}
          margin='normal'
          required
        />
        {/* Use MentionsInput for the Template Body field */}
        <MentionsInput
          className='custom-mentions-input'
          value={formData.templateBody}
          onChange={(e) =>
            handleChange({
              target: { name: 'templateBody', value: e.target.value },
            })
          }
          placeholder='Type here...'
        >
          <Mention
            trigger='{{'
            data={[
              { id: 'class', display: 'class' },
              { id: 'rollno', display: 'rollno' },
              { id: 'name', display: 'name' },
            ]}
            renderSuggestion={(suggestion, search, highlightedDisplay) => (
              <div className='custom-mention'>
                {highlightedDisplay}
                <style>
                  {`
          .custom-mention {
            padding: 8px 12px;
            background-color: #f0f0f0;
            border-radius: 4px;
            cursor: pointer;
          }

          .custom-mention:hover {
            background-color: #e0e0e0;
          }
        `}
                </style>
              </div>
            )}
          />
        </MentionsInput>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginRight: '20px' }}
          >
            Save
          </Button>
          <Button variant='contained' color='error' type='button'>
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default NotificationForm;
