# Notification Settings Theming

NotificationSettings uses semantic app tokens instead of fixed light-mode Tailwind colors:

- Panels use `--surface`, `--text`, and `--border`.
- Form controls use `--surface-raised`, `--text`, `--border`, and `--accent` focus outlines.
- Toggle tracks use neutral surface tokens when off and `--accent` when checked.
- Toggle thumbs use `--bg`, `--surface`, and `--border` so they remain visible in light and dark themes.
- Peer focus rings keep the existing Tailwind focus affordance and theme the ring with `--accent-transparent`.

These tokens are backed by `design-system/tokens/colors.json` neutral and secondary/accent values and mirrored in `src/index.css` for runtime theme switching.

## Header Notification Bell

The `NotificationBell` component is integrated into the Layout header to provide an interactive and accessible entry point to notifications:

- **Store Integration**: Dynamically reads the `notification` state from `useNotification` and computes the unread count. It explicitly defaults missing `isRead` flags to `false` (unread).
- **Badge Indicator**: Renders an unread badge only when the unread count is greater than 0. The badge uses the semantic `--danger` token as its background color with white text and a `2px solid var(--surface)` border overlay to create a floating visual ring.
- **Micro-Animations**: Features a premium CSS keyframe shake/swing animation (`bellShake`) when the user hovers over the bell link.
- **Target Sizes & Layout**: Designed for touch accessibility with a `min-height` and `min-width` of `var(--touch-target)` (`44px`).
- **Responsive Display**:
  - Mounted inside `desktop-nav` for screen resolutions >= 768px.
  - Mounted inside `.mobile-bell-wrapper` next to the mobile menu hamburger button for resolutions < 768px.
- **Accessibility**: Includes a dynamic `aria-label` containing the unread count (e.g. `aria-label="Notifications, 3 unread"` or `aria-label="Notifications, 0 unread"`), ensuring screen readers can announce the notification status.

