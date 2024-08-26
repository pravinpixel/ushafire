import _ from 'lodash';
import React, { useState, DragEvent } from 'react';

import { Card, Stack, Avatar, Typography } from '@mui/material';

import { fDate } from 'helper/FormatHelper';
import { ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { DealsListResponse, DealsopportunityStage } from 'helper/types/sales-crm-system/DealsTypes';

import { useDealsEdit } from 'store/hooks/SalesCrmSystemHook';

import TableTopBar from 'views/components/ui-componet/TableTopBar';

type Props = {
  data: DealsListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};

function colors(index: number) {
  const modIndex = index % 8;
  switch (modIndex) {
    case 0:
      return 'darkGreyOne';
    case 1:
      return 'darkRed';
    case 2:
      return 'lightBlue';
    case 3:
      return 'primary';
    case 4:
      return 'warning';
    case 5:
      return 'success';
    case 6:
      return 'secondary';
    case 7:
      return 'darkPink';
    default:
      return 'primary';
  }
}

const DealsListTable = ({ data, params, setParams, redirectLink, permission }: Props) => {
  const [id, setId] = useState<string>('');

  const { mutateAsync } = useDealsEdit();

  const handleDrop = async (opportunityStage: DealsopportunityStage['opportunityStage']) => {
    await mutateAsync({
      formData: {
        opportunityStage,
      },
      id,
    });
  };
  const handleDragStart = (dealId?: string) => {
    setId(dealId as never);
  };
  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <TableTopBar
        addPath={redirectLink}
        enabled={{
          essentialFilter: [
            {
              essentialName: 'Deals-filter-customer',
              label: 'Customer',
            },
            {
              essentialName: 'Deals-filter-salesperson',
              label: 'Employee',
            },
            {
              essentialName: 'Deals-filter-contacttype',
              label: 'Contact Type',
            },
          ],
        }}
        buttonLabel={permission.name}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        filterCount={data?.filterCount}
      />
      <Stack
        direction={'row'}
        gap={3}
        overflow={'auto'}
        sx={{
          height: '100%',
        }}
      >
        {_.map(data?.list, (deals, index) => {
          const array = deals?.opportunityStage || [];
          return (
            <Stack
              key={deals._id}
              onDrop={() => {
                handleDrop({
                  label: deals?.name,
                  value: deals?._id,
                });
              }}
              onDragOver={handleDragOver}
              gap={2}
            >
              <Card color={colors(index)} variant="dealCard">
                <Stack height={'100%'} px={5} justifyContent={'center'}>
                  <Typography variant="h6" noWrap>
                    {deals?.name}
                  </Typography>
                  <Typography variant="subtitle3" noWrap color={({ palette }) => palette.grey[500]}>
                    {/* {deals?.name} |  */}
                    {deals?.opportunityStage.length} Deals
                  </Typography>
                </Stack>
              </Card>
              {array?.length < 1 && (
                <div>
                  <Card variant="dealCard">
                    <Stack alignItems={'center'} justifyContent={'center'}>
                      <Typography variant="h6" color={({ palette }) => palette.grey[500]} noWrap>
                        No Data
                      </Typography>
                    </Stack>
                  </Card>
                </div>
              )}
              {_.map(array, (deal) => {
                return (
                  <React.Fragment key={deal?._id}>
                    <Card
                      draggable
                      variant="dealCard"
                      onDragStart={() => {
                        handleDragStart(deal._id);
                      }}
                      onDragEnd={() => {
                        setId('');
                      }}
                      sx={{
                        cursor: 'grab',
                      }}
                    >
                      <Stack height={'100%'} flexDirection={'row'} gap={3} px={3} alignItems={'center'}>
                        <Avatar variant="circular" src={deal.customerId?.customerPhoto} />
                        <Stack>
                          <Typography variant="subtitle1">{deal?.customerId?.label}</Typography>
                          <Typography variant="subtitle2" color={({ palette }) => palette.grey[500]}>
                            {deal?.leadId?.label} | {deal?.customerId?.contactType}
                          </Typography>
                          <Typography variant="subtitle3"> {deal?.salePersonId?.label}</Typography>
                          <Typography variant="subtitle2" color={({ palette }) => palette.grey[500]}>
                            {fDate(deal?.updatedAt)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Card>
                  </React.Fragment>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default DealsListTable;
