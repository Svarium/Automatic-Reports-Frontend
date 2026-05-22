import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import StudentGroupCard from './StudentGroupCard';

const SortableGroupCard = ({ group }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: group.route_name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div 
                {...attributes} 
                {...listeners}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    padding: '4px',
                    zIndex: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title="Arrastrar para ordenar"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="9" cy="5" r="1" />
                    <circle cx="9" cy="19" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <circle cx="15" cy="5" r="1" />
                    <circle cx="15" cy="19" r="1" />
                </svg>
            </div>
            <StudentGroupCard group={group} />
        </div>
    );
};

export default SortableGroupCard;
