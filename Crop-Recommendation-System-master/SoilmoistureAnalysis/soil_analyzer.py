import cv2
import numpy as np

def estimate_soil_moisture(image_path):
    """
    Estimate soil moisture from an image by combining grayscale and blue channel analysis.
    Uses both overall brightness (grayscale) and blue channel sensitivity (water absorption)
    with blur and median for robustness. Higher intensity indicates drier soil.
    Returns moisture percentage (0-100%).
    """
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Unable to read the image.")

    # Convert to grayscale and apply blur
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    gray_median = np.median(gray_blurred)

    # Split into channels and use blue channel
    b, g, r = cv2.split(image)
    blue_blurred = cv2.GaussianBlur(b, (5, 5), 0)
    blue_median = np.median(blue_blurred)

    # Combine: weighted average (50% grayscale, 50% blue)
    combined_intensity = (gray_median + blue_median) / 2

    # Heuristic: Moisture = 100 - (combined_intensity / 255 * 100)
    # Assuming darker (lower intensity) = wetter soil
    moisture = 100 - (combined_intensity / 255 * 100)

    # Clamp to 0-100
    moisture = max(0, min(100, moisture))

    return round(moisture, 2)
