# Project Structure

This project follows a modular folder layout with dedicated directories for each main feature or screen. The root layout includes a tab-based navigation structure, while specific features, like `explore`, use stack navigation for additional screens within that feature.

## Directory Layout

```plaintext

app/
├── (auth)/
│   ├── logIn.tsx
│   └── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx      # Tabs layout
│   ├── explore/
│   │   ├── _layout.tsx  # Stack navigator for "Explore"
│   │   ├── Inbox.tsx    # Explore main screen
│   │   └── item/
│   │       └── [itemId].tsx # Item details screen
│   ├── messages/
│   │   └── Inbox.tsx
│   ├── listGear/
│   │   └── Inbox.tsx
│   └── profile/
│       └── Inbox.tsx
└── _layout.tsx          # Root layout with Slot
