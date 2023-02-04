import React, { useMemo, useRef, useCallback, useEffect } from "react";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Text } from 'react-native';

const BottomSheet = React.forwardRef((props, ref) => {
     
    const snapPoints = useMemo(() => [ '40%' , '70%' ], []);
     
    return (

        <BottomSheetModalProvider>
            <BottomSheetModal ref={ref} index={1} snapPoints={snapPoints} enablePanDownToClose>
                <BottomSheetScrollView>
                    {props.children}
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>

    )

})

export default BottomSheet;