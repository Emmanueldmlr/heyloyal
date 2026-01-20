# HeyLoyal

The goal of this project is to create a React Native app that allows users to browse available rewards, collect them, and view their collection.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native 0.83.1 (Community CLI) |
| **Language** | TypeScript 5.8.3 |
| **State Management** | Redux Toolkit 2.11.2 + React Redux 9.2.0 |
| **Navigation** | React Navigation 7 (Stack Navigator) |
| **Styling** | React Native StyleSheet with centralized theme |
| **Icons** | Lucide React Native |
| **Environment** | react-native-config |
| **Testing** | Jest 29 + React Test Renderer |

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.19.4 (required by React Native 0.83.1)
- **Yarn** >= 1.22.x
- **Watchman** (recommended for macOS)
- **Xcode** >= 15.0 (for iOS development)
- **CocoaPods** (for iOS dependencies)
- **Android Studio** with:
  - Android SDK
  - Android NDK
  - Java Development Kit (JDK) 17

### Verify Prerequisites

```bash
node --version    # Should be >= 20.19.4
yarn --version    # Should be >= 1.22.x
pod --version     # CocoaPods installed
```

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HeyLoyal
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```bash
API_BASE_URL=https://staging.helloagain.at/api/v1/clients/5189
```

### 4. iOS Setup

```bash
cd ios
bundle install          # Install Ruby dependencies
bundle exec pod install # Install CocoaPods dependencies
cd ..
```

### 5. Android Setup

Ensure your `local.properties` file in `/android` contains the correct SDK path:

```properties
sdk.dir=/Users/<your-username>/Library/Android/sdk
```

## Running the App

### Start Metro Bundler

```bash
yarn start
```

### Run on iOS

```bash
yarn ios
```

### Run on Android

```bash
yarn android
```

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn start` | Start Metro bundler |
| `yarn ios` | Build and run on iOS simulator |
| `yarn android` | Build and run on Android emulator |
| `yarn test` | Run test suite |
| `yarn lint` | Run ESLint |

## Project Structure

```
HeyLoyal/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AchievementSummary/
│   │   ├── CollectedRewardCard/
│   │   ├── CollectionCard/
│   │   └── RewardCard/
│   ├── hooks/                # Custom React hooks
│   │   └── useRewards.ts     # Rewards fetching & pagination
│   ├── navigation/           # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/              # App screens
│   │   ├── home/             # Available rewards list
│   │   └── reward/           # Collected rewards view
│   ├── services/             # API services
│   │   └── RewardsSrv.ts
│   ├── store/                # Redux store
│   │   ├── slices/
│   │   │   └── rewardsSlice.ts
│   │   ├── hooks.ts          # Typed Redux hooks
│   │   └── index.ts
│   ├── theme/                # Design system
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── borderRadius.ts
│   │   └── shadows.ts
│   └── types/                # TypeScript interfaces
├── __tests__/                # Test files
├── App.tsx                   # App entry point
├── index.js                  # React Native entry
└── .env                      # Environment variables
```

## Core Logic

### 1. Rewards Fetching (`useRewards` hook)

The app fetches rewards from a paginated API with the following logic:

```typescript
// API returns:
{
  count: number,      // Total items available on current page
  next: string | null, // URL to next page (if exists)
  results: Reward[]   // Array of rewards
}
```

**Pagination Strategy:**
- `limit` parameter controls how many items to fetch per request (default: 10)
- `page` parameter indicates which page to fetch from
- The hook tracks items fetched from the current page
- Includes a 1.5-second delay on `fetchMore` to prevent rapid API calls

### 2. Redux State Management

**State Shape:**
```typescript
{
  rewards: {
    collectedRewards: CollectedReward[]
  }
}
```

**Action:**
- `collectReward` - Adds a reward to the collection with a timestamp
- Prevents duplicate rewards from being collected

**Selectors:**
- `selectCollectedRewards` - Get all collected rewards
- `selectIsRewardCollected(id)` - Check if a specific reward is collected
- `selectCollectedRewardsCount` - Get total number of collected rewards
- `selectTotalCollectedPoints` - Calculate sum of all collected points

### 3. Theme System

Centralized design tokens for consistent styling:

```typescript
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';

// Usage in styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
});
```

### 4. Import Alias

The project uses `@/` as an alias for the `src/` directory:

```typescript
// Instead of
import { colors } from '../../../theme';

// Use
import { colors } from '@/theme';
```

Configured in `tsconfig.json` and `babel.config.js`.

## Assumptions

1. **API Response Format:** The rewards API returns a paginated response with `count`, `next`, `previous`, and `results` fields.

2. **Image Filtering:** Rewards without images are filtered out from the display list to ensure consistent UI.

3. **Reward Identification:** Each reward has a unique `id` field used to prevent duplicate collections.

4. **Points System:** The `needed_points` field represents the cost/value of each reward.

5. **Collection Persistence:** Currently, collected rewards are stored in Redux state only (not persisted to local storage or backend).

7. **Network Availability:** The app expects stable network connectivity; offline support is not implemented.

## Testing

The project includes unit tests for:

- **Redux Slice:** Action creators and selectors
- **API Service:** Network requests and response handling
- **Custom Hooks:** State management logic
- **Components:** UI rendering and interactions

### Run Tests

```bash
yarn test
```

## Troubleshooting

### iOS Build Issues

**CocoaPods not found:**
```bash
sudo gem install cocoapods
# Or use bundler
bundle exec pod install
```

**Xcode build fails:**
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install --repo-update
cd ..
```

### Android Build Issues

**NDK not found:**
- Open Android Studio → SDK Manager → SDK Tools
- Install NDK (Side by side)

**Gradle build fails:**
```bash
cd android
./gradlew clean
cd ..
```

### Metro Bundler Issues

**Clear cache and restart:**
```bash
yarn start --reset-cache
```

### Environment Variables Not Loading

Ensure `.env` file exists in project root and rebuild:
```bash
# iOS
cd ios && pod install && cd ..
yarn ios

# Android
cd android && ./gradlew clean && cd ..
yarn android
```
