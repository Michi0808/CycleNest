import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CycleCards(props) {
  const { list } = props;

  const cards = list.map((card, index) => {
    return (
      <li key={index}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: card.color,
            boxShadow: 1,
            borderRadius: 2,
            p: 1,
            m: 2,
            minWidth: 300,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18 }}>{card.title}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>
              {card.length} {card.length === 1 ? 'day' : 'days'}
            </Typography>
          </CardContent>
        </Card>
      </li>
    );
  });

  return <ul>{cards}</ul>;
}
