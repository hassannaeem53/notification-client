import { useState, useEffect } from 'react';
// import axios from 'axios';
import { DataFunc, SuggestionDataItem } from 'react-mentions';
import apiClient from '../services/apiClient';

const useFetchTags = () => {
  const [tags, setTags] = useState<SuggestionDataItem[] | DataFunc>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTagsFromDatabase = async () => {
      try {
        const tagsResponse = await apiClient.get('/tags');
        const tags = tagsResponse.data;

        const tagData = tags.map((tag) => ({
          id: tag,
          display: tag,
        }));

        setTags(tagData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching tags');
        setLoading(false);
      }
    };

    fetchTagsFromDatabase();
  }, []);

  return { tags, loading, error };
};

export default useFetchTags;
