import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, TextField, Paper } from '@mui/material';
import {
  MentionsInput,
  Mention,
  SuggestionDataItem,
  DataFunc,
} from 'react-mentions'; // Import the MentionsInput and Mention components
import { Tag } from 'react-tag-autocomplete'; // Import the Tag type
import './NotificationForm.css';
import createNotification from '../../services/notificationServices';
import axios from 'axios';
import TextEditor from '../TextEditor';

interface FormValues {
  name: string;
  description: string;
  templatebody: string;
  tags: SuggestionDataItem[] | DataFunc; // Add a tags field to store the selected tags
}

interface Props {
  onChange: (formData: FormValues) => void;
}

const NotificationForm: React.FC<Props> = ({ onChange }) => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    description: '',
    templatebody: '',
    tags: [], // Initialize tags as an empty array
  });

  useEffect(() => {
    // Fetch the list of tags from the server using Axios when the component mounts
    const fetchTagsFromDatabase = async () => {
      try {
        const tagsResponse = await axios.get('http://localhost:3000/api/tags');
        const tags = tagsResponse.data;

        // Populate formData.tags with your tag data
        const tagData = tags.map((tag) => ({
          id: tag, // Assuming your tag data is simple strings
          display: tag,
        }));

        setFormData((prevData) => ({
          ...prevData,
          tags: tagData,
        }));
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTagsFromDatabase();
  }, []);

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
    const inputData = {
      name: formData.name,
      description: formData.description,
      templatebody: formData.templatebody,
    };
    createNotification(inputData);
    // Handle form submission, e.g., send data to an API
  };
  const handleMentionsInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter (submitting the form)
      const newTemplatebody = formData.templatebody + '\n'; // Append a newline character

      handleChange({
        target: { name: 'templatebody', value: newTemplatebody },
      });
      console.log('newTemplatebody', formData.templatebody);
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ height: '470px' }}>
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
          <TextField
            label='Template Subject'
            variant='outlined'
            fullWidth
            name='templateSubject'
            value={formData.description}
            onChange={handleChange}
            margin='normal'
            required
          />
          {/* Use MentionsInput for the Template Body field */}
          <div onKeyDown={(e) => handleMentionsInputKeyDown(e)}>
            <MentionsInput
              className='custom-mentions-input'
              value={formData.templatebody}
              onChange={(e) =>
                handleChange({
                  target: { name: 'templatebody', value: e.target.value },
                })
              }
              readOnly={false}
              placeholder='Template Body *'
            >
              <Mention
                trigger='{{'
                data={formData.tags}
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
                markup='{{__display__}}'
              />
            </MentionsInput>
          </div>
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
    </>
  );
};

export default NotificationForm;
