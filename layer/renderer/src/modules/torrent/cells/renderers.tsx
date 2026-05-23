import { AddedOnCell } from './AddedOnCell'
import { BooleanCell } from './BooleanCell'
import { BytesValueCell } from './BytesValueCell'
import { CategoryCell } from './CategoryCell'
import { CheckboxCell } from './CheckboxCell'
import { CompletionCell } from './CompletionCell'
import { DownloadedCell } from './DownloadedCell'
import { DurationCell } from './DurationCell'
import { EtaCell } from './EtaCell'
import { LastActivityCell } from './LastActivityCell'
import { NameCell } from './NameCell'
import { NumberValueCell } from './NumberValueCell'
import { PeersCell } from './PeersCell'
import { PriorityCell } from './PriorityCell'
import { ProgressCell } from './ProgressCell'
import { RatioCell } from './RatioCell'
import { RemainingCell } from './RemainingCell'
import { SavePathCell } from './SavePathCell'
import { SeedingTimeCell } from './SeedingTimeCell'
import { SeedsCell } from './SeedsCell'
import { SeenCompleteCell } from './SeenCompleteCell'
import { SizeCell } from './SizeCell'
import { SpeedCell } from './SpeedCell'
import { SpeedLimitCell } from './SpeedLimitCell'
import { StatusCell } from './StatusCell'
import { TagsCell } from './TagsCell'
import { TextValueCell } from './TextValueCell'
import { TimeActiveCell } from './TimeActiveCell'
import { TrackerCell } from './TrackerCell'
import { UploadedCell } from './UploadedCell'

// Static cell renderer functions - these are defined at module level
// so they don't get recreated on every render
export const SelectCellRenderer = (props: { rowIndex: number }) => (
  <CheckboxCell rowIndex={props.rowIndex} />
)

export const NameCellRenderer = (props: { rowIndex: number }) => (
  <NameCell rowIndex={props.rowIndex} />
)

export const SizeCellRenderer = (props: { rowIndex: number }) => (
  <SizeCell rowIndex={props.rowIndex} />
)

export const ProgressCellRenderer = (props: { rowIndex: number }) => (
  <ProgressCell rowIndex={props.rowIndex} />
)

export const DlspeedCellRenderer = (props: { rowIndex: number }) => (
  <SpeedCell rowIndex={props.rowIndex} speedType="dlspeed" />
)

export const UpspeedCellRenderer = (props: { rowIndex: number }) => (
  <SpeedCell rowIndex={props.rowIndex} speedType="upspeed" />
)

export const EtaCellRenderer = (props: { rowIndex: number }) => (
  <EtaCell rowIndex={props.rowIndex} />
)

export const RatioCellRenderer = (props: { rowIndex: number }) => (
  <RatioCell rowIndex={props.rowIndex} />
)

export const StateCellRenderer = (props: { rowIndex: number }) => (
  <StatusCell rowIndex={props.rowIndex} />
)

export const PriorityCellRenderer = (props: { rowIndex: number }) => (
  <PriorityCell rowIndex={props.rowIndex} />
)

export const TrackerCellRenderer = (props: { rowIndex: number }) => (
  <TrackerCell rowIndex={props.rowIndex} />
)

export const CategoryCellRenderer = (props: { rowIndex: number }) => (
  <CategoryCell rowIndex={props.rowIndex} />
)

export const TagsCellRenderer = (props: { rowIndex: number }) => (
  <TagsCell rowIndex={props.rowIndex} />
)

export const AddedOnCellRenderer = (props: { rowIndex: number }) => (
  <AddedOnCell rowIndex={props.rowIndex} />
)

export const CompletionCellRenderer = (props: { rowIndex: number }) => (
  <CompletionCell rowIndex={props.rowIndex} />
)

export const LastActivityCellRenderer = (props: { rowIndex: number }) => (
  <LastActivityCell rowIndex={props.rowIndex} />
)

export const SavePathCellRenderer = (props: { rowIndex: number }) => (
  <SavePathCell rowIndex={props.rowIndex} />
)

export const DownloadedCellRenderer = (props: { rowIndex: number }) => (
  <DownloadedCell rowIndex={props.rowIndex} />
)

export const UploadedCellRenderer = (props: { rowIndex: number }) => (
  <UploadedCell rowIndex={props.rowIndex} />
)

export const SeedsCellRenderer = (props: { rowIndex: number }) => (
  <SeedsCell rowIndex={props.rowIndex} />
)

export const PeersCellRenderer = (props: { rowIndex: number }) => (
  <PeersCell rowIndex={props.rowIndex} />
)

export const RemainingCellRenderer = (props: { rowIndex: number }) => (
  <RemainingCell rowIndex={props.rowIndex} />
)

export const TimeActiveCellRenderer = (props: { rowIndex: number }) => (
  <TimeActiveCell rowIndex={props.rowIndex} />
)

export const SeedingTimeCellRenderer = (props: { rowIndex: number }) => (
  <SeedingTimeCell rowIndex={props.rowIndex} />
)

// --- qBittorrent standard fields (cell renderers) ---

export const AutoTmmCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="auto_tmm" />
)

export const AvailabilityCellRenderer = (props: { rowIndex: number }) => (
  <NumberValueCell rowIndex={props.rowIndex} field="availability" decimals={2} />
)

export const ContentPathCellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell rowIndex={props.rowIndex} field="content_path" pathTail={2} />
)

export const DlLimitCellRenderer = (props: { rowIndex: number }) => (
  <SpeedLimitCell rowIndex={props.rowIndex} field="dl_limit" />
)

export const UpLimitCellRenderer = (props: { rowIndex: number }) => (
  <SpeedLimitCell rowIndex={props.rowIndex} field="up_limit" />
)

export const DownloadedSessionCellRenderer = (props: { rowIndex: number }) => (
  <BytesValueCell rowIndex={props.rowIndex} field="downloaded_session" />
)

export const UploadedSessionCellRenderer = (props: { rowIndex: number }) => (
  <BytesValueCell rowIndex={props.rowIndex} field="uploaded_session" />
)

export const MagnetUriCellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell
    rowIndex={props.rowIndex}
    field="magnet_uri"
    mono
    truncateChars={40}
  />
)

export const FirstLastPiecePrioCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="f_l_piece_prio" />
)

export const ForceStartCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="force_start" />
)

export const RatioLimitCellRenderer = (props: { rowIndex: number }) => (
  <NumberValueCell
    rowIndex={props.rowIndex}
    field="ratio_limit"
    decimals={2}
    treatNegativeAsSentinel
  />
)

export const SeedingTimeLimitCellRenderer = (props: { rowIndex: number }) => (
  <DurationCell
    rowIndex={props.rowIndex}
    field="seeding_time_limit"
    unit="minutes"
    treatNegativeAsSentinel
  />
)

export const SeenCompleteCellRenderer = (props: { rowIndex: number }) => (
  <SeenCompleteCell rowIndex={props.rowIndex} />
)

export const SequentialDownloadCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="seq_dl" />
)

export const SuperSeedingCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="super_seeding" />
)

export const TotalSizeCellRenderer = (props: { rowIndex: number }) => (
  <BytesValueCell rowIndex={props.rowIndex} field="total_size" />
)

// --- qBittorrent 5.0+ fields ---

export const InfohashV1CellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell
    rowIndex={props.rowIndex}
    field="infohash_v1"
    mono
    truncateChars={16}
  />
)

export const InfohashV2CellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell
    rowIndex={props.rowIndex}
    field="infohash_v2"
    mono
    truncateChars={16}
  />
)

export const PopularityCellRenderer = (props: { rowIndex: number }) => (
  <NumberValueCell rowIndex={props.rowIndex} field="popularity" decimals={2} />
)

export const CommentCellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell rowIndex={props.rowIndex} field="comment" truncateChars={60} />
)

export const PrivateCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="private" />
)

export const HasMetadataCellRenderer = (props: { rowIndex: number }) => (
  <BooleanCell rowIndex={props.rowIndex} field="has_metadata" />
)

export const ReannounceCellRenderer = (props: { rowIndex: number }) => (
  <DurationCell rowIndex={props.rowIndex} field="reannounce" unit="seconds" />
)

export const RootPathCellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell rowIndex={props.rowIndex} field="root_path" pathTail={2} />
)

export const DownloadPathCellRenderer = (props: { rowIndex: number }) => (
  <TextValueCell rowIndex={props.rowIndex} field="download_path" pathTail={2} />
)

export const TrackersCountCellRenderer = (props: { rowIndex: number }) => (
  <NumberValueCell rowIndex={props.rowIndex} field="trackers_count" />
)

export const InactiveSeedingTimeLimitCellRenderer = (props: {
  rowIndex: number
}) => (
  <DurationCell
    rowIndex={props.rowIndex}
    field="inactive_seeding_time_limit"
    unit="minutes"
    treatNegativeAsSentinel
  />
)
