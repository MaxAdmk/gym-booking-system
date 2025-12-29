import { useState } from 'react';
import api from '../services/api';

const FileUpload = ({ onUpload, defaultImage, label }) => {
    const [image, setImage] = useState(defaultImage || '');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setImage(res.data.url);
            onUpload(res.data.url);
        } catch (error) {
            alert('Upload failed');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>{label || 'Upload Image'}:</label>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ 
                    width: '80px', height: '80px', 
                    borderRadius: '8px', overflow: 'hidden', 
                    border: '1px solid #ccc', background: '#f9f9f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {image ? (
                        <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: '10px', color: '#999' }}>No Image</span>
                    )}
                </div>

                <div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                        id={`file-upload-${label}`}
                    />
                    <label 
                        htmlFor={`file-upload-${label}`} 
                        style={{ 
                            padding: '8px 12px', background: '#007bff', color: 'white', 
                            borderRadius: '4px', cursor: 'pointer', fontSize: '13px',
                            display: 'inline-block'
                        }}
                    >
                        {uploading ? 'Uploading...' : 'Choose File'}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;