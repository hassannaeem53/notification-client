import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTags = () => {
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTagsFromDatabase = async () => {
      try {
        const tagsResponse = await axios.get('http://localhost:3000/api/tags');
        const tagsData = tagsResponse.data;

        // Extract the tag strings from the response data
        const tagStrings = tagsData.map((tag) => tag.toString());

        setTags(tagStrings);
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
