-- TOAST 그리드 정보 테이블
CREATE TABLE DI_HV_ST_TOAST_GRID_INFO(
      [ID]              [INT] IDENTITY(1,1) NOT NULL
    , ScreenID          NVARCHAR(100) NOT NULL
    , GridID            NVARCHAR(100) NOT NULL
    , ScreenName        NVARCHAR(100) NULL
    , GridName          NVARCHAR(100) NULL
    , EtcOption         NVARCHAR(1000) NULL
    , ReferenceID       INT NULL
    , LastUpdateOn      DATETIME  NULL
    , LastUpdatedBy     NVARCHAR(50) NULL
    , CreatedOn         DATETIME  NULL
    , CreatedBy         NVARCHAR(50) NULL
    , Active            BIT NOT NULL DEFAULT 1
    , LastDeleteOn      DATETIME  NULL
    , LastDeletedBy     NVARCHAR(50) NULL
    , LastReactivateOn  DATETIME  NULL
    , LastReactivatedBy NVARCHAR(50) NULL
    , ArchiveID         INT NULL
    , LastArchiveOn     DATETIME  NULL
    , LastArchivedBy    NVARCHAR(50) NULL
    , LastRestoreOn     DATETIME  NULL
    , LastRestoredBy    NVARCHAR(50) NULL
    , RowVersionStamp   INT NOT NULL DEFAULT 1
    CONSTRAINT [PK_DI_HV_ST_TOAST_GRID_INFO] PRIMARY KEY CLUSTERED ( [ID] ASC)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY] 
) ON [PRIMARY] ;
CREATE INDEX IDX_DI_HV_ST_TOAST_GRID_INFO_01 ON DI_HV_ST_TOAST_GRID_INFO (ScreenID, GridID);
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The unique ID of the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'ID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'화면ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'ScreenID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'그리드ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'GridID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'화면명(메뉴명)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'ScreenName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'그리드명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'GridName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'기타옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'EtcOption'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The links to FlexData.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'ReferenceID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last updated.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastUpdateOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last updated the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastUpdatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was created.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'CreatedOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who created the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'CreatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indicates if the record is active or deleted.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'Active'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last deleted.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastDeleteOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last deleted the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastDeletedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last reactivated.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastReactivateOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last reactivated the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastReactivatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The archive identifier.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'ArchiveID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last archived.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastArchiveOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last archived the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastArchivedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last restored from the archive.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastRestoreOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last restored the record from the archive.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'LastRestoredBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The current version identifier for the row for the detection of concurrency violations.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_INFO', @level2type=N'COLUMN',@level2name=N'RowVersionStamp'

-- TOAST 컬럼 정보 테이블
CREATE TABLE DI_HV_ST_TOAST_COL_INFO(
      [ID]                [INT] IDENTITY(1,1) NOT NULL
    , ColID               NVARCHAR(100) NOT NULL
    , ColName             NVARCHAR(100) NULL
    , DictionaryID        NVARCHAR(100) NULL
    , Width               NVARCHAR(40)  NULL
    , Height              NVARCHAR(40)  NULL
    , Align               NVARCHAR(40)  NULL
    , Valign              NVARCHAR(40)  NULL
    , ClassName           NVARCHAR(100) NULL
    , Hidden              BIT NULL
    , FilterType          NVARCHAR(100) NULL
    , FilterShowApplyBtn  BIT NULL
    , FilterShowClearBtn  BIT NULL
    , SortingType         NVARCHAR(100) NULL
    , Resizable           BIT NULL
    , Sortable            BIT NULL
    , EtcOption           NVARCHAR(1000) NULL
    , ReferenceID         INT NULL
    , LastUpdateOn        DATETIME  NULL
    , LastUpdatedBy       NVARCHAR(50) NULL
    , CreatedOn           DATETIME  NULL
    , CreatedBy           NVARCHAR(50) NULL
    , Active bit          NOT NULL DEFAULT 1
    , LastDeleteOn        DATETIME  NULL
    , LastDeletedBy       NVARCHAR(50) NULL
    , LastReactivateOn    DATETIME  NULL
    , LastReactivatedBy   NVARCHAR(50) NULL
    , ArchiveID           INT NULL
    , LastArchiveOn       DATETIME  NULL
    , LastArchivedBy      NVARCHAR(50) NULL
    , LastRestoreOn       DATETIME  NULL
    , LastRestoredBy      NVARCHAR(50) NULL
    , RowVersionStamp     INT NOT NULL DEFAULT 1
    CONSTRAINT [PK_DI_HV_ST_TOAST_COL_INFO] PRIMARY KEY CLUSTERED ( [ID] ASC)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY] 
) ON [PRIMARY] ;
CREATE INDEX IDX_DI_HV_ST_TOAST_COL_INFO_01 ON DI_HV_ST_TOAST_COL_INFO (ColID, ColName);
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The unique ID of the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'ID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'컬럼 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'ColID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'컬럼명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'ColName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'사전ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'DictionaryID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'넓이' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Width'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'높이' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Height'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'가로정렬' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Align'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'세로정렬' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Valign'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'CSS Style명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'ClassName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'숨김형태' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Hidden'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'필터형태' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'FilterType'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'필터적용버튼옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'FilterShowApplyBtn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'필터해제버튼옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'FilterShowClearBtn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'정렬형태' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'SortingType'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'리사이즈옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Resizable'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'정렬옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Sortable'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'기타옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'EtcOption'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The links to FlexData.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'ReferenceID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last updated.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastUpdateOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last updated the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastUpdatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was created.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'CreatedOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who created the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'CreatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indicates if the record is active or deleted.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'Active'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last deleted.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastDeleteOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last deleted the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastDeletedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last reactivated.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastReactivateOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last reactivated the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastReactivatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The archive identifier.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'ArchiveID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last archived.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastArchiveOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last archived the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastArchivedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last restored from the archive.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastRestoreOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last restored the record from the archive.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'LastRestoredBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The current version identifier for the row for the detection of concurrency violations.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_COL_INFO', @level2type=N'COLUMN',@level2name=N'RowVersionStamp'

--TOAST 그리드/컬럼 매핑 테이블
CREATE TABLE DI_HV_ST_TOAST_GRID_COL_MAPPING(
      [ID]              [INT] IDENTITY(1,1) NOT NULL
    , ToastGridID       INT NOT NULL
    , ToastColID        INT NOT NULL
    , Sort int          NOT NULL
    , Facility          NVARCHAR(40) NULL
    , Width             NVARCHAR(40)  NULL
    , Height            NVARCHAR(40)  NULL
    , EtcOption         NVARCHAR(1000) NULL
    , ReferenceID       INT NULL
    , LastUpdateOn      DATETIME  NULL
    , LastUpdatedBy     NVARCHAR(50) NULL
    , CreatedOn         DATETIME  NULL
    , CreatedBy         NVARCHAR(50) NULL
    , Active            BIT NOT NULL DEFAULT 1
    , LastDeleteOn      DATETIME  NULL
    , LastDeletedBy     NVARCHAR(50) NULL
    , LastReactivateOn  DATETIME  NULL
    , LastReactivatedBy NVARCHAR(50) NULL
    , ArchiveID         INT NULL
    , LastArchiveOn     DATETIME  NULL
    , LastArchivedBy    NVARCHAR(50) NULL
    , LastRestoreOn     DATETIME  NULL
    , LastRestoredBy    NVARCHAR(50) NULL
    , RowVersionStamp   INT NOT NULL DEFAULT 1
    CONSTRAINT [PK_DI_HV_ST_TOAST_GRID_COL_MAPPING] PRIMARY KEY CLUSTERED ( [ID] ASC)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90) ON [PRIMARY] 
) ON [PRIMARY] ;
CREATE INDEX IDX_DI_HV_ST_TOAST_GRID_COL_MAPPING_01 ON DI_HV_ST_TOAST_GRID_COL_MAPPING (ToastGridID, ToastColID);
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The unique ID of the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'ID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'DI_HV_ST_TOAST_GRID_INFO의 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'ToastGridID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'DI_HV_ST_TOAST_COL_INFO의 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'ToastColID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'정렬순서' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'Sort'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'공장' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'Facility'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'넓이' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'Width'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'높이' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'Height'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'기타옵션' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'EtcOption'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The links to FlexData.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'ReferenceID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last updated.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastUpdateOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last updated the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastUpdatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was created.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'CreatedOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who created the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'CreatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indicates if the record is active or deleted.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'Active'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last deleted.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastDeleteOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last deleted the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastDeletedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last reactivated.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastReactivateOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last reactivated the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastReactivatedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The archive identifier.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'ArchiveID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last archived.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastArchiveOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last archived the record.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastArchivedBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date when the record was last restored from the archive.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastRestoreOn'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who last restored the record from the archive.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'LastRestoredBy'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The current version identifier for the row for the detection of concurrency violations.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DI_HV_ST_TOAST_GRID_COL_MAPPING', @level2type=N'COLUMN',@level2name=N'RowVersionStamp'

-- 그리드 정보 조회
SELECT DHSTGCM.Sort                                         AS Sort
     , DHSTCI.ColID                                         AS name
     , DHSTCI.FilterType                                    AS [filter.type]
     , N'AND'                                               AS [filter.operator]
     , DHSTCI.FilterShowApplyBtn                            AS [filter.showApplyBtn]
     , DHSTCI.FilterShowClearBtn                            AS [filter.showClearBtn]
     , DHSTCI.SortingType                                   AS sortingType
     , DHSTCI.Resizable                                     AS resizable
     , DHSTCI.Sortable                                      AS sortable
     , DHSTCI.Width                                         AS width
     , DHSTCI.Hidden                                        AS hidden
     , DHSTCI.ClassName                                     AS [className]
     , DHSTCI.Align                                         AS align
     , DHSTCI.DictionaryID                                  AS DictionaryID
     , dbo.DI_FN_DICTIONARY_NAME(DHSTCI.DictionaryID, 1042) AS header 
     , DHSTGI.ID                                            AS GridID
     , DHSTCI.ID                                            AS ColID
  FROM DI_HV_ST_TOAST_GRID_INFO DHSTGI WITH(NOLOCK)
       INNER JOIN DI_HV_ST_TOAST_GRID_COL_MAPPING DHSTGCM WITH(NOLOCK)
       ON  DHSTGI.ID      = DHSTGCM.ToastGridID 
       AND DHSTGCM.Active = 1
       INNER JOIN DI_HV_ST_TOAST_COL_INFO DHSTCI WITH(NOLOCK)
       ON  DHSTGCM.ToastColID = DHSTCI.ID 
       AND DHSTCI.Active = 1
 WHERE DHSTGI.ScreenID = 'DIOEM_HV_MM_PRIVATE_REQUIRED_SCR'
   AND DHSTGI.GridID   = 'PrivateRequiredList'
   AND DHSTGI.Active   = 1 
 ORDER BY DHSTGCM.Sort ASC;
 