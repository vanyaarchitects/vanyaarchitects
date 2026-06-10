import os
from PIL import Image

def process_directory(base_dir):
    print(f"\nProcessing directory: {base_dir}")
    if not os.path.exists(base_dir):
        print("Directory does not exist. Skipping.")
        return

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            file_path = os.path.join(root, file)
            ext = os.path.splitext(file)[1].lower()
            
            if ext in ['.jpg', '.jpeg', '.png']:
                orig_size = os.path.getsize(file_path)
                try:
                    img = Image.open(file_path)
                    w, h = img.size
                    
                    # 1. Resize if longer side > 2000px
                    max_dimension = 2000
                    if w > max_dimension or h > max_dimension:
                        if w > h:
                            new_w = max_dimension
                            new_h = int(h * (max_dimension / w))
                        else:
                            new_h = max_dimension
                            new_w = int(w * (max_dimension / h))
                        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                        print(f"  Resized {file} from {w}x{h} to {new_w}x{new_h}")
                    
                    # 2. If it's a PNG, convert to JPEG (since these are photorealistic renders and don't need transparency)
                    if ext == '.png':
                        # Convert RGBA to RGB if necessary
                        if img.mode in ('RGBA', 'LA'):
                            background = Image.new('RGB', img.size, (255, 255, 255))
                            background.paste(img, mask=img.split()[3]) # 3 is alpha channel
                            img = background
                        else:
                            img = img.convert('RGB')
                        
                        new_file_path = os.path.splitext(file_path)[0] + '.jpg'
                        img.save(new_file_path, 'JPEG', quality=82, optimize=True)
                        os.remove(file_path)
                        new_size = os.path.getsize(new_file_path)
                        savings = (orig_size - new_size) / (1024 * 1024)
                        print(f"  Converted PNG to JPEG: {file} -> {os.path.basename(new_file_path)}")
                        print(f"    Size: {orig_size / (1024*1024):.2f}MB -> {new_size / (1024*1024):.2f}MB (Saved {savings:.2f}MB)")
                    
                    # 3. If it's a JPEG, compress it
                    else:
                        img = img.convert('RGB')
                        img.save(file_path, 'JPEG', quality=82, optimize=True)
                        new_size = os.path.getsize(file_path)
                        savings = (orig_size - new_size) / (1024 * 1024)
                        if savings > 0.05: # Only print if meaningful savings
                            print(f"  Compressed JPEG: {file}")
                            print(f"    Size: {orig_size / (1024*1024):.2f}MB -> {new_size / (1024*1024):.2f}MB (Saved {savings:.2f}MB)")
                
                except Exception as e:
                    print(f"  ❌ Error processing {file}: {e}")

# Process both assets and public folders
process_directory("public/works/3d-designs")
process_directory("assets/works/3d-designs")
print("\nCompression finished!")
