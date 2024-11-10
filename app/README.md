# Project Structure

This project follows a modular folder layout with dedicated directories for each main feature or screen. The root layout includes a tab-based navigation structure, while specific features, like `explore`, use stack navigation for additional screens within that feature.

## Directory Layout

```plaintext
app/
├── _layout.tsx          # Root layout with tabs
├── explore/
│   ├── _layout.tsx      # Stack navigator for "Explore"
│   ├── index.tsx        # Explore main screen
│   └── item/
│       └── [id].tsx     # Item details screen with dynamic route based on item ID
├── messages/
│   └── index.tsx        # Messages screen
├── listGear/
│   └── index.tsx        # List Gear screen
└── profile/
    └── index.tsx        # Profile screen
