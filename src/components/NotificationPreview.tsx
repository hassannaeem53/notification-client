import React from 'react';
import Paper from '@mui/material/Paper';

interface FormValues {
  name: string;
  description: string;
  templatebody: string;
}

interface Props {
  formData: FormValues;
}

const NotificationPreview: React.FC<Props> = ({ formData }) => {
  const { templatesubject, templatebody } = formData;

  // Replace newline characters with <br> tags
  const formattedTemplatebody = templatebody.replace(/\n/g, '<br>');
  // Use regular expression to find text enclosed in {{}} and apply a different color and bold style
  const coloredTemplatebody = formattedTemplatebody.replace(
    /{{(.*?)}}/g,
    '<span style="color: blue; font-weight: bold;">{{$1}}</span>'
  );

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif', // Change the font here
      }}
    >
      <div
        style={{
          height: '500px',
          overflowY: 'auto',
        }}
      >
        <h3>Subject: {templatesubject}</h3>
        <div dangerouslySetInnerHTML={{ __html: coloredTemplatebody }} />
      </div>
    </Paper>
  );
};

export default NotificationPreview;
