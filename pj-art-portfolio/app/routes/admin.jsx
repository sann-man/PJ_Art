import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Navbar from "../components/navbar";
import { MdDelete, MdEdit, MdAdd, MdClose } from "react-icons/md";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    file: null
  });

  // Test credentials
  const TEST_EMAIL = "test@mail.com";
  const TEST_PASSWORD = "test123";

  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated]);

  const loadImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error loading images:', error);
    } else {
      setImages(data);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    console.log('Expected:', { TEST_EMAIL, TEST_PASSWORD });

    if (email.trim() === TEST_EMAIL && password.trim() === TEST_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Use test@mail.com / test123");
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image to storage
      const fileName = `${Date.now()}_${formData.file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, formData.file);

      if (uploadError) throw uploadError;

      // Insert into database
      const { error: dbError } = await supabase
        .from('images')
        .insert([{
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          file_path: fileName
        }]);

      if (dbError) throw dbError;

      // Reset form and reload
      setFormData({ name: "", price: "", description: "", file: null });
      setShowAddModal(false);
      await loadImages();
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Failed to add image');
    }
    setLoading(false);
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description
      };

      // If new file uploaded, update storage
      if (formData.file) {
        const fileName = `${Date.now()}_${formData.file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, formData.file);

        if (uploadError) throw uploadError;

        // Delete old file
        await supabase.storage.from('images').remove([editingImage.file_path]);
        updates.file_path = fileName;
      }

      const { error: dbError } = await supabase
        .from('images')
        .update(updates)
        .eq('id', editingImage.id);

      if (dbError) throw dbError;

      setFormData({ name: "", price: "", description: "", file: null });
      setShowEditModal(false);
      setEditingImage(null);
      await loadImages();
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
    setLoading(false);
  };

  const handleDeleteImage = async (image) => {
    if (!confirm(`Delete "${image.name}"?`)) return;

    try {
      // Delete from storage
      await supabase.storage.from('images').remove([image.file_path]);

      // Delete from database
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;

      await loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const openEditModal = (image) => {
    setEditingImage(image);
    setFormData({
      name: image.name || "",
      price: image.price ? image.price.toString() : "",
      description: image.description || "",
      file: null
    });
    setShowEditModal(true);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen text-white">
        <Navbar />
        <div className="pt-20 md:pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-mono gradient-text text-shadow-glow">ADMIN</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 glass-effect p-8 rounded-lg">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="group">
                <label className="block text-white text-sm font-mono mb-2">EMAIL</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-300"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="group">
                <label className="block text-white text-sm font-mono mb-2">PASSWORD</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-300"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="modern-button w-full py-3 px-6 rounded-lg font-mono text-white hover:scale-105 transition-all duration-300"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <div className="pt-20 md:pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-mono gradient-text text-shadow-glow">ADMIN PANEL</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="modern-button py-3 px-6 rounded-lg font-mono text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <MdAdd className="text-xl" />
              Add Painting
            </button>
          </div>

          {loading && <div className="text-center text-gray-300">Loading...</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="glass-effect rounded-lg p-4">
                <img
                  src={supabase.storage.from('images').getPublicUrl(image.file_path).data.publicUrl}
                  alt={image.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{image.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{image.description}</p>
                <p className="text-white font-bold mb-4">${image.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(image)}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MdEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MdDelete />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full glass-effect rounded-lg p-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all"
            >
              <MdClose className="text-white text-2xl" />
            </button>

            <h2 className="text-2xl font-mono gradient-text mb-6">Add New Painting</h2>

            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-mono mb-2">NAME</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-mono mb-2">PRICE</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-mono mb-2">DESCRIPTION</label>
                <textarea
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-24 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-mono mb-2">IMAGE</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="modern-button w-full py-3 px-6 rounded-lg font-mono text-white hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Painting"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full glass-effect rounded-lg p-8">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all"
            >
              <MdClose className="text-white text-2xl" />
            </button>

            <h2 className="text-2xl font-mono gradient-text mb-6">Edit Painting</h2>

            <form onSubmit={handleUpdateImage} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-mono mb-2">NAME</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-mono mb-2">PRICE</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-mono mb-2">DESCRIPTION</label>
                <textarea
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-24 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-mono mb-2">NEW IMAGE (optional)</label>
                <input
                  className="w-full py-3 px-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white
                           focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="modern-button w-full py-3 px-6 rounded-lg font-mono text-white hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Painting"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
